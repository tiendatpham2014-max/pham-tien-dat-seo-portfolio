'use client';

import { useState, type CSSProperties } from 'react';
import { content, type Locale } from '@/lib/content';

type MetricKey = 'clicks' | 'nonbrand' | 'ctr' | 'impressions' | 'position';

const metrics: Record<MetricKey, { previous: number; current: number; digits: number; deltaVi: string; deltaEn: string }> = {
  clicks: { previous: 13795, current: 17540, digits: 0, deltaVi: '+3.745 lượt nhấp (+27,1%)', deltaEn: '+3,745 clicks (+27.1%)' },
  nonbrand: { previous: 13030, current: 17184, digits: 0, deltaVi: '+4.154 lượt nhấp (+31,9%)', deltaEn: '+4,154 clicks (+31.9%)' },
  ctr: { previous: 1.02, current: 1.36, digits: 2, deltaVi: '+0,34 điểm phần trăm', deltaEn: '+0.34 percentage points' },
  impressions: { previous: 1358505, current: 1290541, digits: 0, deltaVi: '−67.964 lượt hiển thị (−5,0%)', deltaEn: '−67,964 impressions (−5.0%)' },
  position: { previous: 28, current: 23, digits: 1, deltaVi: 'Cải thiện 5,0 bậc', deltaEn: 'Improved by 5.0 positions' }
};

const keys: MetricKey[] = ['clicks', 'nonbrand', 'ctr', 'impressions', 'position'];

export default function MetricBoard({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<MetricKey>('clicks');
  const [split, setSplit] = useState(50);
  const c = content[locale];
  const metric = metrics[active];
  const formatter = new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    minimumFractionDigits: metric.digits,
    maximumFractionDigits: metric.digits
  });
  const splitStyle = { '--split': `${split}%` } as CSSProperties;

  return (
    <div className="metricBoard" data-ui>
      <div className="metricChoices" role="group" aria-label={locale === 'vi' ? 'Chọn chỉ số' : 'Choose a metric'}>
        {keys.map(key => (
          <button key={key} type="button" aria-pressed={key === active} onClick={() => setActive(key)}>{c.metricLabels[key]}</button>
        ))}
      </div>
      <div className="metricPanel" aria-live="polite" aria-atomic="true">
        <div className="metricReveal" style={splitStyle}>
          <div className="metricBefore"><span>{c.previous}</span><strong>{formatter.format(metric.previous)}{active === 'ctr' ? '%' : ''}</strong></div>
          <div className="metricAfter"><span>{c.current}</span><strong>{formatter.format(metric.current)}{active === 'ctr' ? '%' : ''}</strong></div>
          <div className="metricDivider" aria-hidden="true"><span>↔</span></div>
        </div>
        <label className="metricRangeLabel" htmlFor="metric-range">{locale === 'vi' ? 'Kéo để so sánh hai kỳ' : 'Drag to compare the periods'}</label>
        <input id="metric-range" className="metricRange" type="range" min="35" max="65" value={split} onChange={event => setSplit(Number(event.target.value))} aria-valuetext={locale === 'vi' ? `Ranh giới ở ${split}%` : `Divider at ${split}%`} />
        <p className="metricDelta">{locale === 'vi' ? metric.deltaVi : metric.deltaEn}</p>
      </div>
      <p className="metricNote">{c.metricFoot}</p>
    </div>
  );
}
