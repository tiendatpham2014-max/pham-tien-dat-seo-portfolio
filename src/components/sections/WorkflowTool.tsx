"use client";
import { useState } from "react";
import type { Language } from "@/content/portfolio";

export function normalizeSampleUrls(input: string) {
  const seen = new Set<string>();
  return input.split(/\r?\n/).map(line => line.trim()).filter(Boolean).slice(0, 8).map(raw => {
    try {
      const url = new URL(raw);
      if (!/^https?:$/.test(url.protocol)) throw Error("protocol");
      url.hash = "";
      [...url.searchParams.keys()].forEach(key => { if (/^(utm_|gclid$|fbclid$)/i.test(key)) url.searchParams.delete(key); });
      url.searchParams.sort();
      const output = url.href;
      const duplicate = seen.has(output);
      seen.add(output);
      return { raw, output, status: duplicate ? "duplicate" : "valid" };
    } catch { return { raw, output: raw, status: "invalid" }; }
  });
}
const sample = "https://shop.example/guide?utm_source=email#intro\nhttps://SHOP.example/guide\nhttps://shop.example/products?size=M&utm_campaign=demo";
export function WorkflowTool({ language }: { language: Language }) {
  const vi = language === "vi";
  const [input, setInput] = useState(sample);
  const [rows, setRows] = useState<ReturnType<typeof normalizeSampleUrls> | null>(null);
  return <details className="workflow-tool" data-lenis-prevent>
    <summary>{vi ? "Thử một workflow mẫu" : "Try a sample workflow"}</summary>
    <p>{vi ? "Mô phỏng logic cho Sheets / Apps Script. Xử lý tại trình duyệt, không truy cập URL và không gửi dữ liệu lên máy chủ." : "A logic demo for a Sheets / Apps Script workflow. Runs locally in your browser, without visiting URLs or sending input to a server."}</p>
    <form onSubmit={event => { event.preventDefault(); setRows(normalizeSampleUrls(input)); }}>
      <label>{vi ? "Mỗi dòng một URL (tối đa 8)" : "One URL per line (up to 8)"}
        <textarea value={input} maxLength={2000} rows={3} onChange={event => { setInput(event.target.value); setRows(null); }} spellCheck={false} />
      </label>
      <div className="workflow-actions"><button type="submit">{vi ? "Chạy mô phỏng" : "Run demo"}</button><button type="button" onClick={() => { setInput(sample); setRows(null); }}>{vi ? "Dùng dữ liệu mẫu" : "Use sample data"}</button></div>
    </form>
    {rows && <div className="workflow-results" aria-live="polite" role="region" aria-label={vi ? "Kết quả mô phỏng" : "Demo results"} tabIndex={0}>
      {rows.length === 0 ? <p>{vi ? "Nhập ít nhất một URL." : "Enter at least one URL."}</p> : <ul>{rows.map((row,index) => <li key={index}><span>{row.status === "invalid" ? vi ? "Không hợp lệ" : "Invalid" : row.status === "duplicate" ? vi ? "Trùng lặp" : "Duplicate" : vi ? "Giữ lại" : "Keep"}</span><code>{row.output}</code></li>)}</ul>}
    </div>}
    <small>{vi ? "Chỉ bỏ fragment và tham số tracking, giữ nguyên chữ hoa/thường trong đường dẫn. Kết quả không phải quyết định canonical; quy tắc cần điều chỉnh theo từng website." : "Removes fragments and tracking parameters; preserves path case. This is not a canonical decision. Rules must be adapted to each website."}</small>
  </details>;
}
