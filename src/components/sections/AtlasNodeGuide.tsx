"use client";
import type { Language } from "@/content/portfolio";
const notes = {
  vi: [
    [["Truy vấn mẫu","Mỗi điểm tượng trưng cho một truy vấn. So sánh cách diễn đạt trước khi gom nhóm."],["Biến thể từ khóa","Hai truy vấn gần nhau chưa chắc cùng ý định tìm kiếm."]],
    [["Tìm hiểu","Cụm câu hỏi cần lời giải thích hoặc hướng dẫn."],["So sánh","Cụm truy vấn cân nhắc các lựa chọn."],["Hành động","Cụm truy vấn muốn mua, đăng ký hoặc sử dụng dịch vụ."],["Điều hướng","Cụm truy vấn tìm một website hoặc thương hiệu cụ thể."]],
    [["Trang trụ cột","Trang chính giới thiệu chủ đề và dẫn tới các bài liên quan."],["Cụm nội dung","Mỗi trang con giải quyết một nhu cầu cụ thể."],["Liên kết nội bộ","Đường nối minh họa quan hệ giữa các trang, không phải liên kết khách hàng thật."]],
    [["Lượt nhấp","Số lần người tìm kiếm nhấp từ Google vào website."],["Lượt hiển thị","Số lần liên kết website xuất hiện trong kết quả tìm kiếm."],["CTR","Tỷ lệ lượt nhấp trên lượt hiển thị; cần đọc cùng phạm vi dữ liệu."],["Vị trí","Vị trí trung bình là số tổng hợp, không phải thứ hạng của mọi từ khóa."]],
    [["Ưu tiên","Chọn vấn đề có bằng chứng và phù hợp mục tiêu website."],["Triển khai","Thay đổi có phạm vi rõ ràng để đối chiếu sau này."],["Đo lại","So sánh cùng cách lọc dữ liệu trước khi kết luận."]]
  ],
  en: [
    [["Sample query","Each node represents a query. Compare wording before grouping."],["Keyword variant","Nearby queries do not necessarily share the same intent."]],
    [["Informational","Questions that need an explanation or a guide."],["Comparison","Queries weighing up different options."],["Action","Queries aimed at buying, signing up or using a service."],["Navigational","Queries looking for a particular website or brand."]],
    [["Core pillar","The main topic page connects readers to related resources."],["Content cluster","Each supporting page addresses a distinct need."],["Internal link","Connections illustrate page relationships, not an actual client link graph."]],
    [["Clicks","Visits initiated by clicking a Google search result."],["Impressions","Appearances of a website link in search results."],["CTR","Clicks divided by impressions; read it within the same data scope."],["Position","An aggregate average, not every keyword's ranking."]],
    [["Prioritize","Choose an evidence-backed issue aligned with the site's goals."],["Implement","Make a scoped change that can be compared later."],["Measure again","Use consistent data filters before drawing conclusions."]]
  ]
};
export function AtlasNodeGuide({stage,node,language,onSelect}:{stage:number;node:number|null;language:Language;onSelect:(index:number|null)=>void}) {
  const items=notes[language][stage];
  const index=node===null?null:stage===3?Math.floor(node/9)%items.length:stage===2?(node===0?0:node<7?1:2):node%items.length;
  return <aside className="atlas-node-guide" aria-label={language==="vi"?"Chú giải mô hình minh họa":"Illustrative model guide"} onKeyDown={event=>{if(event.key==="Escape")onSelect(null);}}>
    <button type="button" className="atlas-guide-toggle" aria-expanded={node!==null} aria-controls="atlas-node-note" onClick={()=>onSelect(node===null?0:null)}>{language==="vi"?"Chú giải mô hình":"Model guide"} <span aria-hidden="true">{node===null?"+":"−"}</span></button>
    {index!==null && <div id="atlas-node-note" className="atlas-node-note">
      <div className="atlas-guide-options">{items.map(([label],i)=><button key={label} type="button" aria-pressed={i===index} onClick={()=>onSelect(stage===3?i*9:stage===2?[0,1,7][i]:i)}>{label}</button>)}</div>
      <p role="status"><strong>{items[index][0]}. </strong>{items[index][1]}</p>
    </div>}
  </aside>;
}
