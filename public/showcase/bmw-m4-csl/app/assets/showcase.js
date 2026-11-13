(function(){
      "use strict";
      var english = document.documentElement.lang === "en";
      var msg = function(vi,en){ return english ? en : vi; };
      var errbox = document.getElementById('errbox');
      function showErr(m){ var value = msg('Có lỗi: ','Error: ') + m; if (errbox.textContent !== value) { errbox.style.display='block'; errbox.textContent = value; } }
      window.addEventListener('error', function(e){ showErr(e.message || 'không tải được trang 3D'); });
      window.addEventListener('unhandledrejection', function(e){ showErr((e.reason && e.reason.message) || 'không tải được model'); });

      /* ============ DỮ LIỆU BỘ PHẬN (bản CSL zin, số liệu công bố) ============ */
      var PARTS = [
        {id:'grille', sys:'Ngoại thất', name:'Lưới tản nhiệt & cản trước carbon', en:'Grille / front bumper',
         patterns:[/grille_F_csl/,/bumper_F/,/splitter_F_csl/], explode:[0,0.12,0.55],
         desc:'Cụm đầu xe CSL: lưới quả thận viền đỏ đặc trưng, cản trước và lip chia gió bằng sợi carbon để tăng lực ép và dẫn gió làm mát.',
         fn:'Dẫn gió vào két nước/intercooler, tạo downforce ở đầu xe', mat:'CFRP (sợi carbon), nhựa đen nhám', spec:'Lip trước carbon — một phần gói khí động học CSL', note:'Lip carbon thấp, dễ cạ khi xuống hầm dốc.'},
        {id:'headlight', sys:'Ngoại thất', name:'Đèn pha Laserlight — DRL vàng', en:'Headlights',
         patterns:[/headlight/,/headlightglass/], explode:[0,0.1,0.5],
         desc:'Đèn pha BMW Laserlight phát sáng màu vàng — cả hiệu ứng chào mừng khi mở khóa lẫn đèn chiếu gần/xa — gợi nhớ xe đua GT; dải sáng ban ngày vàng là dấu hiệu nhận biết riêng của M4 CSL.',
         fn:'Chiếu sáng, DRL vàng nhận diện CSL', mat:'Kính polycarbonate, chóa LED/Laser', spec:'Laserlight, tầm chiếu xa tới ~600 m (số liệu BMW)', note:'Cụm đèn kín, hỏng là thay cả cụm.'},
        {id:'hood', sys:'Ngoại thất', name:'Nắp ca-pô carbon', en:'Hood',
         patterns:[/hood_csl/], explode:[0,0.85,0.15],
         desc:'Ca-pô CFRP với dải trang trí đỏ và phần carbon lộ, nhẹ hơn ca-pô nhôm của M4 thường — góp phần vào 100 kg cắt giảm của CSL.',
         fn:'Che khoang máy, giảm trọng lượng đầu xe', mat:'CFRP sơn + carbon lộ', spec:'Thuộc gói giảm cân ~100 kg so với M4 Competition', note:'Không tỳ vật nặng lên ca-pô carbon.'},
        {id:'roof', sys:'Ngoại thất', name:'Trần carbon CFRP', en:'Carbon roof',
         patterns:[/roof_carbon/,/roofline_csl/], explode:[0,1.0,0],
         desc:'Trần xe bằng sợi carbon nguyên tấm — hạ thấp trọng tâm và là chi tiết “chữ ký” của các bản M hiệu năng cao.',
         fn:'Giảm cân ở điểm cao nhất, hạ trọng tâm xe', mat:'CFRP bóng', spec:'Trang bị tiêu chuẩn trên M4 CSL', note:'Tránh hóa chất mạnh làm ố lớp clear carbon.'},
        {id:'mirror', sys:'Ngoại thất', name:'Gương chiếu hậu M', en:'Mirrors',
         patterns:[/mirror_L/,/mirror_R/], explode:[0,0.25,0],
         desc:'Gương M hai chân đặc trưng, tích hợp đèn báo rẽ.',
         fn:'Quan sát phía sau, báo rẽ', mat:'Nhựa sơn, mặt gương kính', spec:'Chỉnh/gập điện, sấy gương', note:'Mặt gương bên tài và bên phụ khác độ cong.'},
        {id:'door', sys:'Ngoại thất', name:'Cửa & thân xe', en:'Doors / body',
         patterns:[/door_FL/,/door_FR/,/M4xNME_body/,/fender_/], explode:[0,0.05,0],
         desc:'Thân xe thép–nhôm của G82, vè trước có khe thoát gió M. Bản CSL bỏ cách âm ở nhiều vị trí để giảm cân.',
         fn:'Kết cấu chịu lực, an toàn va chạm', mat:'Thép cường lực + nhôm', spec:'Dài 4.794 mm · rộng 1.887 mm · trục cơ sở 2.857 mm', note:'CSL cắt giảm vật liệu cách âm nên ồn hơn bản thường.'},
        {id:'trunk', sys:'Ngoại thất', name:'Cốp sau & cánh gió ducktail carbon', en:'Trunk / ducktail',
         patterns:[/trunk_csl/,/tailgateframe/], explode:[0,0.55,-0.4],
         desc:'Nắp cốp CFRP tạo hình cánh gió “đuôi vịt” tích hợp — gợi nhớ M3 CSL E46 huyền thoại và tăng lực ép đuôi xe.',
         fn:'Tăng downforce đuôi xe, giảm cân', mat:'CFRP', spec:'Ducktail liền khối với nắp cốp', note:'Không treo thêm cánh gió phụ lên nắp carbon.'},
        {id:'taillight', sys:'Ngoại thất', name:'Đèn hậu laser sợi quang', en:'Taillights',
         patterns:[/taillight/,/tailgatelight/], explode:[0,0.15,-0.55],
         desc:'Đèn hậu CSL dùng sợi quang laser đan chéo — nhẹ hơn và chỉ có trên bản CSL.',
         fn:'Báo hiệu phía sau, nhận diện CSL', mat:'Sợi quang laser trong vỏ kính tối màu', spec:'Công nghệ đèn hậu riêng của CSL', note:'Cụm kín, không thay lẻ bóng được.'},
        {id:'diffuser', sys:'Ngoại thất', name:'Khuếch tán gió sau carbon', en:'Rear diffuser',
         patterns:[/diffuser/], explode:[0,-0.15,-0.6],
         desc:'Diffuser carbon dưới cản sau, ôm cụm ống xả và ổn định luồng gió gầm.',
         fn:'Giảm nhiễu gió gầm, tăng ổn định tốc độ cao', mat:'CFRP', spec:'Đi cùng lip trước + ducktail thành gói aero CSL', note:'Thấp và sắc — cẩn thận khi lùi sát lề cao.'},
        {id:'engine', sys:'Động cơ & truyền động', name:'Động cơ S58 — 3.0L I6 Twin-Turbo', en:'S58 engine',
         patterns:[/M4xNME_engine$/,/_engine_M4/,/enginebay/,/intake/], explode:[0,0.7,0.3],
         desc:'Trái tim của CSL: S58 6 xi-lanh thẳng hàng 3,0 lít, hai turbo đơn cuộn, phun áp suất 350 bar. Mạnh hơn M4 Competition 40 hp nhờ tăng áp suất turbo.',
         fn:'Sinh công suất kéo xe', mat:'Khối nhôm, trục khuỷu rèn, lõi block in 3D', spec:'2.993 cc · 550 hp @ 6.250 rpm · 650 Nm @ 2.750–5.950 rpm', note:'Chỉ chạy xăng chỉ số octane cao theo khuyến cáo.'},
        {id:'strutbrace', sys:'Động cơ & truyền động', name:'Giằng tháp phuộc nhôm đúc', en:'Strut brace',
         patterns:[/strutbrace/], explode:[0,0.9,0.3],
         desc:'Thanh giằng nhôm đúc nguyên khối, phát triển hoàn toàn mới cho CSL, nối hai tháp phuộc trước để tăng độ cứng khoang máy và độ chính xác của tay lái.',
         fn:'Chống xoắn khoang máy khi vào cua', mat:'Nhôm đúc', spec:'Nhẹ hơn ~1,5 kg so với giằng của M4 Competition', note:'Kiểm tra bu-lông tháp phuộc sau khi chạy track.'},
        {id:'cooling', sys:'Động cơ & truyền động', name:'Két nước & intercooler', en:'Radiator / intercooler',
         patterns:[/radiator/,/intercooler/,/radsupport/], explode:[0,0,0.6],
         desc:'Hệ thống làm mát tăng cường của S58: két nước chính, két phụ và intercooler nước–gió cho hai turbo.',
         fn:'Giữ nhiệt độ động cơ và khí nạp ổn định khi chạy nặng', mat:'Nhôm, nhựa composite', spec:'Làm mát khí nạp gián tiếp bằng nước', note:'Nước làm mát mạch riêng cho intercooler cần đúng chủng loại.'},
        {id:'gearbox', sys:'Động cơ & truyền động', name:'Hộp số M Steptronic 8 cấp & trục các-đăng', en:'Gearbox / driveshaft',
         patterns:[/transmission/,/driveshaft/,/transfercase/], explode:[0,-0.08,-0.25],
         desc:'Hộp số tự động 8 cấp M Steptronic với Drivelogic, truyền lực qua trục các-đăng xuống cầu sau — CSL chỉ dẫn động cầu sau.',
         fn:'Truyền lực từ động cơ xuống bánh sau', mat:'Vỏ hợp kim nhẹ, trục thép/carbon', spec:'8 cấp · RWD · vi sai Active M Differential', note:'Thay dầu hộp số theo lịch xe chạy track thì rút ngắn một nửa.'},
        {id:'diff', sys:'Động cơ & truyền động', name:'Vi sai & bán trục sau', en:'Differential / halfshafts',
         patterns:[/M4xNME_diff_F/,/M4xNME_diff$/,/_diff_F/,/halfshaft/], explode:[0,-0.12,-0.55],
         desc:'Vi sai chủ động Active M Differential khóa biến thiên 0–100%, chia lực kéo giữa hai bánh sau.',
         fn:'Chia mô-men xoắn, chống trượt bánh sau', mat:'Thép hợp kim', spec:'Khóa điện tử 0–100%', note:'Tiếng hú nhẹ ở tốc độ thấp khi khóa vi sai là bình thường.'},
        {id:'exhaust', sys:'Động cơ & truyền động', name:'Ống xả titanium M', en:'Titanium exhaust',
         patterns:[/exhaust/], explode:[0,-0.25,-0.7],
         desc:'Hệ xả sau bằng titanium với van điều tiết — nhẹ hơn hệ thép của M4 thường và cho tiếng pô CSL rất đặc trưng, 4 đầu xả đen nhám.',
         fn:'Thoát khí xả, tạo âm thanh, giảm cân', mat:'Titanium (đoạn sau), thép không gỉ', spec:'Nhẹ hơn ~4,3 kg so với xả thép tiêu chuẩn', note:'Đầu xả đen nhám tránh đánh bóng bằng hóa chất ăn mòn.'},
        {id:'wheel', sys:'Gầm, phanh & lốp', name:'Mâm 827 M & lốp Michelin Cup 2 R', en:'Wheels / tyres',
         patterns:[/wheels_enkeif/,/^Object_4/], explode:[0,0,0],
         desc:'Mâm rèn siêu nhẹ kiểu 827 M sơn vàng đồng mờ (Gold Bronze) hoặc đen nhám, bọc lốp Michelin Pilot Sport Cup 2 R phát triển riêng cho CSL.',
         fn:'Truyền lực kéo/phanh xuống mặt đường', mat:'Hợp kim rèn siêu nhẹ, cao su bán slick', spec:'Trước 275/35 R19 · Sau 285/30 R20', note:'Cup 2 R bám đường khô cực tốt nhưng trơn khi mưa lạnh — đúng chất lốp track.'},
        {id:'brake', sys:'Gầm, phanh & lốp', name:'Phanh M Carbon Ceramic — kẹp phanh đỏ', en:'Brakes',
         patterns:[/brakedisc/,/amdb11/], explode:[0,0,0],
         desc:'Phanh M Carbon ceramic trang bị tiêu chuẩn trên M4 CSL — nhẹ hơn phanh M Compound của M4 Competition khoảng 14,3 kg, kẹp phanh cố định 6 piston trước sơn đỏ.',
         fn:'Hãm tốc, chịu nhiệt khi chạy trường đua', mat:'Đĩa carbon-ceramic, kẹp phanh sơn đỏ', spec:'Đĩa trước 400×38 mm · sau 380×28 mm', note:'Đĩa ceramic bền nhiệt nhưng chi phí thay rất cao; tránh xịt nước lạnh vào đĩa đang nóng.'},
        {id:'suspension', sys:'Gầm, phanh & lốp', name:'Hệ treo & phuộc thích ứng M', en:'Suspension',
         patterns:[/strut_F/,/shock/,/spring/,/lowerarm/,/upperarm/,/swaybar/,/subframe/,/tierod/,/steeringbox/], explode:[0,-0.1,0],
         desc:'Treo trước MacPherson, sau đa liên kết 5 thanh với khung phụ nhôm; CSL dùng lò xo, thanh cân bằng và góc đặt bánh riêng, phuộc điện tử thích ứng M.',
         fn:'Giữ bánh bám đường, ổn định thân xe', mat:'Nhôm rèn, thép', spec:'Chiều cao và độ cứng hiệu chỉnh riêng cho CSL', note:'Góc camber trước âm lớn — lốp mòn mép trong nhanh hơn xe thường.'},
        {id:'seat', sys:'Nội thất', name:'Ghế carbon bucket M', en:'Carbon bucket seats',
         patterns:[/seat_L_csl/,/seat_R_csl/], explode:[0,0.9,-0.1],
         desc:'Ghế xô full carbon CFRP lưng cố định, đệm tháo rời được cho ngày chạy track — riêng cặp ghế đã tiết kiệm khoảng 24 kg.',
         fn:'Giữ người lái khi vào cua, giảm cân', mat:'CFRP, Alcantara/da Merino', spec:'Chỉnh tay, không có sưởi ghế', note:'Lưng ghế carbon — cẩn thận khóa kéo, vật cứng cọ xước.'},
        {id:'cockpit', sys:'Nội thất', name:'Vô-lăng, táp-lô & console carbon', en:'Steering / dash / console',
         patterns:[/steer_stitch/,/M4xNME_dash/,/console_csl/,/shifter/,/interior_csl/,/doorpanel/,/gaspedal/,/brakepedal/], explode:[0,0.55,-0.15],
         desc:'Khoang lái CSL: vô-lăng M bọc Alcantara với vạch 12 giờ đỏ, táp-lô và console trung tâm ốp carbon, viền đỏ thay cho chrome. Hàng ghế sau bị loại bỏ để giảm cân.',
         fn:'Điều khiển xe, hiển thị thông tin', mat:'Carbon, Alcantara, da', spec:'Không có hàng ghế sau — khoang 2 chỗ', note:'Cụm nút M1/M2 trên vô-lăng gán nhanh chế độ vận hành.'}
      ];
      var EN_SYSTEMS = {'Ngoại thất':'Exterior','Động cơ & truyền động':'Engine & drivetrain','Gầm, phanh & lốp':'Chassis, brakes & tyres','Nội thất':'Interior'};
      var EN_PARTS = {
        grille:['The CSL front combines red outlined kidney grilles with a carbon bumper and splitter to direct cooling air and add front downforce.','Cooling airflow and front downforce','Carbon fibre reinforced plastic and matte black polymer','Carbon front splitter in the CSL aero package','The low splitter can scrape on steep ramps.'],
        headlight:['Yellow BMW Laserlight illumination gives the CSL a distinctive motorsport inspired signature.','Road lighting and CSL identification','Polycarbonate lens, LED and laser elements','BMW quoted range of up to about 600 m','The sealed unit is replaced as an assembly.'],
        hood:['The carbon fibre hood trims weight over the regular M4 and exposes a purposeful engine bay.','Cover the engine bay and reduce front axle weight','Painted and exposed carbon fibre','Part of an approximately 100 kg reduction from M4 Competition','Avoid placing heavy objects on the carbon panel.'],
        roof:['A one piece carbon roof lowers the centre of gravity.','Reduce weight at the highest point of the car','Gloss carbon fibre','Standard on the M4 CSL','Avoid harsh chemicals on the clear coat.'],
        mirror:['Distinctive twin stalk M mirrors include turn indicators.','Rear visibility and signalling','Painted polymer and mirror glass','Electric adjustment, folding and heating','Driver and passenger mirrors have different curvature.'],
        door:['The G82 steel and aluminium body includes M front fender vents. The CSL removes some sound insulation to save weight.','Structure and crash protection','High strength steel and aluminium','4,794 mm long · 1,887 mm wide · 2,857 mm wheelbase','Less insulation makes the CSL louder than a standard M4.'],
        trunk:['The carbon trunk lid forms an integrated ducktail spoiler inspired by the E46 M3 CSL.','Rear downforce and lower weight','Carbon fibre','Integrated ducktail spoiler','Do not mount an added wing on the carbon lid.'],
        taillight:['Laser fibre light guides create the CSL specific rear light signature.','Rear signalling and recognition','Laser light guides in a dark lens','CSL specific rear light technology','The sealed assembly cannot be serviced bulb by bulb.'],
        diffuser:['The carbon rear diffuser guides underbody airflow around the exhaust.','Reduce turbulence and improve high speed stability','Carbon fibre','Completes the CSL aero package with the front splitter and ducktail','Watch its low edge when reversing near a kerb.'],
        engine:['The S58 is a 3.0 litre twin turbo inline six producing 550 hp and 650 Nm.','Produce the car’s power','Aluminium block and forged internals','2,993 cc · 550 hp at 6,250 rpm · 650 Nm at 2,750–5,950 rpm','Use the recommended high octane fuel.'],
        strutbrace:['A cast aluminium brace links the front suspension towers for a stiffer front end.','Limit chassis flex while cornering','Cast aluminium','About 1.5 kg lighter than the M4 Competition brace','Check mounting bolts after track use.'],
        cooling:['The S58 cooling system combines radiators and a water to air intercooler.','Control engine and intake temperatures','Aluminium and composite','Indirect water cooling for the intake charge','Use the specified coolant for the intercooler circuit.'],
        gearbox:['An eight speed M Steptronic transmission sends power to the rear wheels.','Transfer engine power to the rear axle','Light alloy case and steel or carbon shaft','8 speed · rear wheel drive · Active M Differential','Track use can call for shorter fluid service intervals.'],
        diff:['The Active M Differential varies locking to share torque between rear wheels.','Distribute torque and limit wheelspin','Alloy steel','Electronically controlled variable locking','Some low speed differential noise can be normal.'],
        exhaust:['A titanium rear exhaust cuts weight and gives the CSL its distinct sound.','Expel gases, shape sound and reduce weight','Titanium rear section and stainless steel','About 4.3 kg lighter than the standard steel exhaust','Avoid abrasive polish on the matte black tips.'],
        wheel:['Lightweight forged 827 M wheels wear CSL specific Michelin Pilot Sport Cup 2 R tyres.','Put drive and braking force on the road','Forged alloy and track focused rubber','Front 275/35 R19 · rear 285/30 R20','Cup 2 R tyres lose grip in cold or wet conditions.'],
        brake:['Standard carbon ceramic brakes reduce unsprung mass and withstand track heat.','Slow the car repeatedly at high temperature','Carbon ceramic discs and red calipers','Front 400×38 mm · rear 380×28 mm','Avoid spraying cold water on hot discs.'],
        suspension:['CSL specific springs, anti roll bars and adaptive dampers tune the G82 suspension for track driving.','Keep the tyres in contact with the road','Forged aluminium and steel','CSL specific ride height and damping','Negative front camber can increase inner edge tyre wear.'],
        seat:['Fixed back carbon bucket seats save about 24 kg as a pair.','Support occupants in corners and reduce mass','Carbon fibre, Alcantara and leather','Manual adjustment; no seat heating','Hard objects can scratch the carbon seat back.'],
        cockpit:['Alcantara, exposed carbon and red accents define a stripped back two seat cockpit.','Vehicle control and information','Carbon fibre, Alcantara and leather','Two seats; rear bench removed','M1 and M2 steering wheel buttons recall drive settings.']
      };
      function systemLabel(sys){return english ? EN_SYSTEMS[sys] || sys : sys;}
      function partLabel(p){return english ? p.en : p.name;}
      function partField(p,key){if (!english) return p[key]; var i={desc:0,fn:1,mat:2,spec:3,note:4}[key]; return EN_PARTS[p.id] && i !== undefined ? EN_PARTS[p.id][i] : p[key];}
      /* Thông số PBR của sơn: metalness phải THẤP (sơn xe là lớp màu phủ
         clearcoat, không phải kim loại trần). Bản cũ để metal 0,5–0,65
         khiến three.js biến sơn thành chrome tối — màu hiển thị trên xe
         lệch hẳn mã màu đã chọn (xanh Portimao thành navy sẫm như gương). */
      var PAINTS = [
        {name:'Frozen Brooklyn Grey metallic', hex:0x6e7174, rough:.62, metal:.12},
        {name:'Alpine White', hex:0xf2f3f4, rough:.3,  metal:.05},
        {name:'Black Sapphire metallic', hex:0x14161a, rough:.32, metal:.25},
        {name:'M Brooklyn Grey metallic', hex:0x5f666c, rough:.36, metal:.25},
        {name:'Isle of Man Green metallic', hex:0x0d4d3a, rough:.3,  metal:.25},
        {name:'Portimao Blue metallic', hex:0x14509e, rough:.3,  metal:.25},
        {name:'Sao Paulo Yellow', hex:0xc6d92e, rough:.32, metal:.1}
      ];

      /* ============ DỰNG DANH SÁCH ============ */
      var groupsEl = document.getElementById('groups');
      var sysOrder = [];
      PARTS.forEach(function(p){ if(sysOrder.indexOf(p.sys)<0) sysOrder.push(p.sys); });
      var btnById = {};
      sysOrder.forEach(function(sys){
        var g = document.createElement('div'); g.className='sysgroup'; g.dataset.sys=sys;
        var det = document.createElement('details'); det.className='sysdetails';
        if (sysOrder.indexOf(sys) === 0) det.open = true; // chỉ mở sẵn nhóm đầu, các nhóm còn lại thu gọn cho trang bớt dài
        var sum = document.createElement('summary'); sum.textContent = systemLabel(sys); det.appendChild(sum);
        var list = document.createElement('div'); list.className='plist';
        PARTS.filter(function(p){return p.sys===sys;}).forEach(function(p){
          var b = document.createElement('button'); b.className='pitem'; b.setAttribute('aria-pressed','false');
          b.innerHTML = '<span></span><small></small>';
          b.querySelector('span').textContent = partLabel(p);
          b.querySelector('small').textContent = english ? '' : p.en;
          b.addEventListener('click', function(){ selectPart(p.id, true); });
          list.appendChild(b); btnById[p.id]=b;
        });
        det.appendChild(list); g.appendChild(det); groupsEl.appendChild(g);
      });
      document.getElementById('search').addEventListener('input', function(e){
        var q = e.target.value.trim().toLowerCase(); var any=false;
        PARTS.forEach(function(p){
          var hit = !q || (p.name+' '+p.en+' '+p.desc).toLowerCase().indexOf(q)>=0;
          btnById[p.id].style.display = hit ? '' : 'none'; if(hit) any=true;
        });
        sysOrder.forEach(function(sys){
          var g = groupsEl.querySelector('[data-sys="'+sys+'"]');
          var vis = Array.prototype.some.call(g.querySelectorAll('.pitem'), function(b){return b.style.display!=='none';});
          g.style.display = vis ? '' : 'none';
          var det = g.querySelector('details');
          if (det && q && vis) det.open = true; // đang tìm thì bung nhóm có kết quả
        });
        document.getElementById('nomatch').hidden = any;
      });

      /* ============ ĐIỀU HƯỚNG NHANH TRÊN MOBILE + NÚT GIẤY PHÉP ============
         Chọn bộ phận KHÔNG tự cuộn trang nữa (bản cũ scrollIntoView đẩy
         xe khỏi màn hình điện thoại). Thay vào đó hiện chip cố định dưới
         màn hình để người dùng chủ động nhảy xuống bảng chi tiết, và nút
         "Về mô hình 3D" trong bảng chi tiết để nhảy ngược lên. */
      document.getElementById('toDetail').addEventListener('click', function(){
        document.getElementById('detail').scrollIntoView({behavior: reduceMotion?'auto':'smooth', block:'start'});
      });
      document.getElementById('sb-detail').addEventListener('click', function(){
        document.getElementById('detail').scrollIntoView({behavior: reduceMotion?'auto':'smooth', block:'start'});
      });
      document.getElementById('tabModel').addEventListener('click', function(){
        document.getElementById('stage').scrollIntoView({behavior: reduceMotion?'auto':'smooth', block:'start'});
      });
      document.getElementById('tabParts').addEventListener('click', function(){
        document.getElementById('detail').scrollIntoView({behavior: reduceMotion?'auto':'smooth', block:'start'});
      });
      document.getElementById('tabList').addEventListener('click', function(){
        document.getElementById('listcard').scrollIntoView({behavior: reduceMotion?'auto':'smooth', block:'start'});
      });
      document.getElementById('toStage').addEventListener('click', function(){
        document.getElementById('stage').scrollIntoView({behavior: reduceMotion?'auto':'smooth', block:'start'});
        document.getElementById('toDetail').hidden = true;
      });
      (function(){
        var btn = document.getElementById('licbtn');
        var body = document.getElementById('licbody');
        function setLic(open){
          body.hidden = !open;
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        btn.addEventListener('click', function(){ setLic(body.hidden); });
        document.getElementById('licclose').addEventListener('click', function(){ setLic(false); btn.focus(); });
        document.addEventListener('click', function(e){
          if (!body.hidden && !body.contains(e.target) && e.target !== btn) setLic(false);
        });
        document.addEventListener('keydown', function(e){
          if (e.key === 'Escape' && !body.hidden) setLic(false);
        });
      })();

      /* ============ THREE.JS ============ */
      var stage = document.getElementById('stage');
      var renderer, scene, camera, controls, carRoot = null;
      var groundMesh = null, discMesh = null;
      var paintMats = [], glassMats = [], frontLightMats = [], rearLightMats = [], allMeshes = [];
      var beamL = null, beamR = null, tailGlow = null, bayLight = null;
      var openers = [], doorOps = [], hoodOp = null, trunkOp = null;
      var partObjects = {};   // id -> [Object3D group nodes]
      var basePos = new Map();
      var bayMeshes = []; var bayGroup = null; var hoodOpen = false;
      var selected = null, xray = false, lightsOn = false;
      var fly = null;
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function isDark(){ var t=document.documentElement.dataset.theme; return t ? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; }
      var themeToggle=document.getElementById('theme-toggle');
      if(themeToggle) themeToggle.addEventListener('click',function(){
        var next=isDark()?'light':'dark';
        document.documentElement.dataset.theme=next;
        try { localStorage.setItem('dat-seo-theme',next); } catch(e){}
        if(scene){
          var bg=next==='dark'?0x101216:0xdfe3e7;
          scene.background.setHex(bg); scene.fog.color.setHex(bg);
          if(groundMesh) groundMesh.material.color.setHex(next==='dark'?0x171a1f:0xc9ced4);
          if(discMesh) discMesh.material.color.setHex(next==='dark'?0x1e2229:0xb9bfc7);
          needsRender=true;
        }
      });

      function init(){
        renderer = new THREE.WebGLRenderer({antialias:true});
        /* WebGL phần mềm (SwiftShader/llvmpipe — máy yếu, máy ảo, môi
           trường kiểm thử): render model 1,24 triệu đỉnh tốn cả giây
           mỗi khung, nếu còn tự xoay liên tục thì main thread bị chiếm
           cứng, trang như treo. Phát hiện renderer phần mềm thì hạ
           pixel ratio xuống 1 và tắt tự xoay mặc định (nút Tự xoay vẫn
           bật lại được). Máy có GPU thật không bị ảnh hưởng gì. */
        var softwareGL = false;
        try {
          var glCtx = renderer.getContext();
          var dbg = glCtx.getExtension('WEBGL_debug_renderer_info');
          var rname = dbg ? String(glCtx.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '') : '';
          softwareGL = /swiftshader|llvmpipe|softpipe/i.test(rname);
        } catch(e){ softwareGL = false; }
        renderer.setPixelRatio(softwareGL ? 1 : Math.min(window.devicePixelRatio||1, 1.25));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.shadowMap.autoUpdate = false; // cảnh tĩnh: chỉ vẽ lại bóng khi model/cụm thay đổi
        stage.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(isDark() ? 0x101216 : 0xdfe3e7);
        scene.fog = new THREE.Fog(isDark() ? 0x101216 : 0xdfe3e7, 18, 42);

        camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
        camera.position.set(4.55, 1.75, 5.35);

        var pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new THREE.RoomEnvironment(), 0.04).texture;

        var key = new THREE.DirectionalLight(0xffffff, 1.7);
        key.position.set(6, 9, 4); key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.left=-7; key.shadow.camera.right=7; key.shadow.camera.top=7; key.shadow.camera.bottom=-7;
        scene.add(key);
        var fill = new THREE.DirectionalLight(0xdfe8ff, 0.7); fill.position.set(-7,4,-5); scene.add(fill);
        var rim = new THREE.DirectionalLight(0xffffff, 1.0); rim.position.set(-3,5,8); scene.add(rim);
        scene.add(new THREE.AmbientLight(0xffffff, 0.25));

        var ground = new THREE.Mesh(
          new THREE.CircleGeometry(16, 48),
          new THREE.MeshStandardMaterial({color: isDark()?0x171a1f:0xc9ced4, roughness:.95, metalness:0})
        );
        ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; scene.add(ground); groundMesh=ground;
        var disc = new THREE.Mesh(
          new THREE.CircleGeometry(4.4, 48),
          new THREE.MeshStandardMaterial({color: isDark()?0x1e2229:0xb9bfc7, roughness:.85, metalness:.05})
        );
        disc.rotation.x = -Math.PI/2; disc.position.y = 0.005; disc.receiveShadow = true; scene.add(disc); discMesh=disc;

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0.62, 0);
        controls.enableDamping = true; controls.dampingFactor = 0.06;
        controls.minDistance = 2.2; controls.maxDistance = 16;
        controls.maxPolarAngle = Math.PI * 0.52;
        controls.autoRotate = !reduceMotion && !softwareGL; controls.autoRotateSpeed = 0.7;
        document.getElementById('spin').setAttribute('aria-pressed', controls.autoRotate ? 'true' : 'false');
        controls.addEventListener('change', function(){ needsRender = true; });

        loadModel();
        resize();
        window.addEventListener('resize', resize);
        renderer.domElement.addEventListener('pointerdown', function(ev){
          controls.autoRotate=false; document.getElementById('spin').setAttribute('aria-pressed','false');
          downPos = {x:ev.clientX, y:ev.clientY};
        });
        renderer.domElement.addEventListener('click', onCanvasClick);
        animate();
      }
      function resize(){
        if(!renderer) return;
        var w = stage.clientWidth, h = stage.clientHeight;
        renderer.setSize(w, h); camera.aspect = w/h; camera.updateProjectionMatrix();
        needsRender = true;
      }

      /* URL tuyệt đối của file GLB. KHÔNG truyền thẳng 'assets/car.glb'
         vào GLTFLoader: FileLoader của three.js bọc đường dẫn trong
         `new Request(url)`, mà Request constructor không phân giải được
         URL tương đối khi document chạy trong iframe sandbox có base là
         about:srcdoc / blob: — lỗi "Failed to parse URL from
         assets/car.glb" giết init() ngay lập tức (đây chính là lỗi người
         dùng gặp, trong khi môi trường audit có URL https thật nên vẫn
         qua). Nguồn đáng tin nhất là chính thẻ <script> three.min.js:
         nó đã tải được thì thuộc tính .src của nó là URL tuyệt đối đã
         phân giải đúng tới thư mục assets/, file GLB nằm ngay cạnh đó. */
      function modelUrl(){
        var s = document.querySelector('script[src*="three.min.js"]');
        if (s && s.src) return s.src.replace(/three\.min\.js(?:[?#].*)?$/, 'car.glb');
        try { return new URL('assets/car.glb', document.baseURI).href; } catch(e){}
        return 'assets/car.glb';
      }

      function loadModel(){
        var loader = new THREE.GLTFLoader();
        if (THREE.MeshoptDecoder) loader.setMeshoptDecoder(THREE.MeshoptDecoder);
        var url = modelUrl();
        function onLoaded(gltf){
          carRoot = gltf.scene;
          // Chuẩn hóa: căn giữa, đặt gầm chạm đất, scale về dài ~4.79m
          var box = new THREE.Box3().setFromObject(carRoot);
          var size = box.getSize(new THREE.Vector3());
          var longest = Math.max(size.x, size.z);
          var s = 4.794 / longest;
          carRoot.scale.setScalar(s);
          box = new THREE.Box3().setFromObject(carRoot);
          var c = box.getCenter(new THREE.Vector3());
          carRoot.position.x -= c.x; carRoot.position.z -= c.z;
          carRoot.position.y -= box.min.y;
          scene.add(carRoot);
          indexModel();
          try { dyeEngineBay(); } catch(e){ showErr('Không nhuộm được khoang máy: ' + (e && e.message ? e.message : e)); }
          try { setupOpeners(); setupMovable(); } catch(e){ showErr('Không dựng được cơ chế mở nắp / nổ tung: ' + (e && e.message ? e.message : e)); }
          if (!openerSets.length || !movable.size) showErr('Cơ chế mở cửa/ca-pô/cốp và nổ tung chưa sẵn sàng (openers=' + openerSets.length + ', movable=' + movable.size + ').');
          try { setupSpoiler(); } catch(e){ showErr('Không dựng được cánh gió ducktail: ' + (e && e.message ? e.message : e)); }
          try { setupBeams(); } catch(e){ }
          window.__bmwShowcase = { openers: openerSets.length, movable: movable.size, meshes: allMeshes.length };
          renderer.shadowMap.needsUpdate = true;
          needsRender = true;
          document.getElementById('loadveil').style.display='none';
          setPaint(0);
        }
        function onProgress(ev){
          if (ev.total) {
            var pct = Math.round(ev.loaded/ev.total*100);
            document.getElementById('loadbar').style.width = pct+'%';
            document.getElementById('loadmsg').textContent = msg('Đang tải model… ','Loading model… ') + pct + '%';
          }
        }
        loader.load(url, onLoaded, onProgress,
          function(err){
            /* Dự phòng: nếu fetch/Request vẫn bị chặn trong iframe, tải
               bytes bằng XMLHttpRequest (phân giải URL như thẻ script,
               không qua Request constructor) rồi đưa thẳng cho parser. */
            var failMsg = 'Không tải được model 3D (assets/car.glb). ' + (err && err.message ? err.message : '');
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onprogress = function(ev){
              if (ev.lengthComputable) onProgress(ev);
            };
            xhr.onload = function(){
              if (xhr.status && xhr.status >= 400) { showErr(failMsg); return; }
              loader.parse(xhr.response, '', onLoaded, function(e2){
                showErr('Không đọc được model 3D. ' + (e2 && e2.message ? e2.message : failMsg));
              });
            };
            xhr.onerror = function(){ showErr(failMsg); };
            try { xhr.send(); } catch(e3){ showErr(failMsg); }
          }
        );
      }

      function matchPart(name){
        for (var i=0;i<PARTS.length;i++){
          var pats = PARTS[i].patterns;
          for (var j=0;j<pats.length;j++){ if (pats[j].test(name)) return PARTS[i].id; }
        }
        return null;
      }

      function indexModel(){
        var byGroup = {};
        carRoot.traverse(function(o){ if(o.name) byGroup[o.name]=o; });
        // Gán mesh vào part theo node tổ tiên có tên khớp pattern
        carRoot.traverse(function(o){
          if (!o.isMesh) return;
          o.castShadow = true; o.receiveShadow = false;
          o.material = Array.isArray(o.material) ? o.material.map(function(m){return m.clone();}) : o.material.clone();
          allMeshes.push(o);
          var mats = Array.isArray(o.material)?o.material:[o.material];
          mats.forEach(function(m){
            var n = m.name||'';
            /* Sơn thân xe CHỈ là vật liệu tên đúng 'M4xNME_Paint' (thân,
               cửa, ca-pô, cốp, cản trước/sau, vè — đã kiểm chứng trong
               GLB). Không nhuộm: Paint2 / Paint2.002 = viền & sọc ĐỎ CSL
               và tappi cửa (giữ đỏ ở mọi màu sơn), Colorable1 = nội thất,
               Carbon1 = carbon, Black = nhựa đen. */
            if (n === 'M4xNME_Paint') paintMats.push(m);
            if (/GlassClear/.test(n)) glassMats.push(m);
            /* Đèn: tách trước/sau và LƯU emissive gốc của model. Bản cũ gom
               tất cả vào một mảng rồi tô vàng đồng loạt — bắt cả vật liệu
               amdb11_brake của ĐĨA PHANH (đĩa phát sáng) và đèn hậu (sáng
               vàng thay vì đỏ). amdb11_* là cụm phanh, không phải đèn. */
            if (m.emissive){
              if (/Lights|runningY|highbeam/.test(n)){
                m.userData._e0 = m.emissive.getHex(); m.userData._ei0 = m.emissiveIntensity;
                frontLightMats.push(m);
              } else if (/taillight|LS8|fogred|lowhighbeam/.test(n) || (/brake/.test(n) && n.indexOf('amdb11')!==0)){
                m.userData._e0 = m.emissive.getHex(); m.userData._ei0 = m.emissiveIntensity;
                rearLightMats.push(m);
              }
            }
          });
          // Tìm tổ tiên gần nhất khớp part; đồng thời ghi nhận mesh thuộc
          // thành khoang máy (enginebay), khối động cơ (M4xNME_engine) hay
          // đường nạp (M4xNME_intake) — X-ray/highlight/tương phản dùng tới
          var node = o, pid = null;
          while (node && node !== carRoot){
            if (node.name === 'M4xNME_enginebay'){ o.userData.bay = true; bayGroup = node; }
            if (node.name === 'M4xNME_engine') o.userData.core = true;
            if (node.name === 'M4xNME_intake') o.userData.intake = true;
            if (/strutbrace/.test(node.name||'')) o.userData.brace = true;
            if (node.name === 'M4xNME_trunk_csl') o.userData.trunkOwner = true;
            if (!pid) pid = matchPart(node.name||'');
            node = node.parent;
          }
          o.userData.partId = pid;
          if (o.userData.bay){
            bayMeshes.push(o);
            /* Mesh ốp khoang máy (enginebay_M4xNME_Paint) dùng chung tên
               vật liệu 'M4xNME_Paint' với sơn thân xe nên đã bị đăng ký
               vào paintMats — mỗi lần đổi sơn/setPaint nó bị nhuộm sáng
               theo màu sơn và phản chiếu môi trường mạnh, tạo thành mảng
               TRẮNG BỆT phủ kín khoang máy, che mất động cơ bên dưới.
               Rút nó khỏi paintMats ngay tại đây; việc nhuộm tối toàn bộ
               khoang máy làm ở dyeEngineBay() sau khi duyệt xong model. */
            mats.forEach(function(m){
              var ix = paintMats.indexOf(m);
              if (ix >= 0) paintMats.splice(ix, 1);
            });
          }
          mats.forEach(function(m){ if ('envMapIntensity' in m) m.envMapIntensity = 0.7; });
        });
        // Gom object đại diện cho explode: node cấp cao nhất khớp pattern
        PARTS.forEach(function(p){
          var objs = [];
          carRoot.traverse(function(o){
            if (!o.name) return;
            var isMatch = p.patterns.some(function(rx){ return rx.test(o.name); });
            if (isMatch){
              // chỉ lấy node mà tổ tiên của nó không khớp cùng part
              var anc = o.parent, ancMatch = false;
              while (anc && anc !== carRoot){
                if (anc.name && p.patterns.some(function(rx){ return rx.test(anc.name); })) { ancMatch = true; break; }
                anc = anc.parent;
              }
              if (!ancMatch && o.children) objs.push(o);
            }
          });
          partObjects[p.id] = objs;
          objs.forEach(function(o){ if(!basePos.has(o)) basePos.set(o, o.position.clone()); });
        });
        // Bánh xe & phanh: explode hướng ra NGOÀI theo trục ngang X.
        // Bản cũ lấy dấu theo z nên bánh trước bị đẩy về phía đầu xe và
        // bánh sau về phía đuôi xe thay vì tách ra hai bên hông.
        ['wheel','brake'].forEach(function(pid){
          (partObjects[pid]||[]).forEach(function(o){
            var wp = new THREE.Vector3(); o.getWorldPosition(wp);
            o.userData.explodeDir = new THREE.Vector3(wp.x >= 0 ? 1 : -1, 0, 0).multiplyScalar(pid === 'brake' ? 1.3 : 0.8);
          });
        });
        PARTS.forEach(function(p){
          if (p.id==='wheel'||p.id==='brake') return;
          (partObjects[p.id]||[]).forEach(function(o){
            o.userData.explodeDir = new THREE.Vector3(p.explode[0], p.explode[1], p.explode[2]);
          });
        });
      }

      /* ============ NHUỘM TỐI KHOANG MÁY (chạy một lượt sau indexModel) ============
         GLB gốc gán MỘT vật liệu xám nhạt (EngineB, base 0,8) cho mọi mesh
         trong khoang máy — khối động cơ, đường nạp, giằng và thành khoang
         không phân biệt được với nhau, lại thêm mesh ốp khoang bằng vật
         liệu sơn sáng — mở ca-pô/X-ray chỉ thấy một mảng trắng bệt nên
         tưởng "mất động cơ". Lượt nhuộm riêng này (theo cờ đã ghi trên
         từng mesh lúc index) ép: khối máy graphite tối, đường nạp gần
         đen, giằng nhôm sáng làm điểm mốc, thành khoang + ốp khoang đen
         mờ phản chiếu yếu — động cơ nổi rõ trên nền khoang tối và không
         mảng nào còn đủ sáng để "trắng bệt" nữa. */
      function dyeEngineBay(){
        /* Duyệt TRỰC TIẾP từng group theo tên node (không dựa vào cờ
           ancestor-walk nữa — bản trước nhuộm trượt khiến cả khoang máy
           giữ nguyên vật liệu EngineB xám 0,8 và trắng bệt dưới đèn):
           khối máy graphite tối, đường nạp gần đen, giằng nhôm sáng làm
           điểm mốc, thành khoang + ốp khoang đen mờ phản chiếu yếu. Mọi
           vật liệu ở đây đều đã là bản clone riêng của từng mesh (xem
           indexModel) nên nhuộm không lan sang cụm khác. */
        function dyeSubtree(rootName, hex, rough, metal, env){
          var root = findNode(rootName);
          if (!root) return;
          root.traverse(function(o){
            if (!o.isMesh) return;
            var mats = Array.isArray(o.material)?o.material:[o.material];
            mats.forEach(function(m){
              if (!m.color) return;
              m.color.setHex(hex); m.roughness = rough; m.metalness = metal;
              if ('envMapIntensity' in m) m.envMapIntensity = env;
              if (m.emissive){ m.emissive.setHex(0x000000); m.emissiveIntensity = 1; }
              m.needsUpdate = true;
            });
          });
        }
        dyeSubtree('M4xNME_engine',     0x2e3237, .34, .5,  .3);
        dyeSubtree('M4xNME_intake',     0x17181a, .55, .25, .25);
        dyeSubtree('M4xNME_strutbrace_F', 0xb9bfc6, .28, .85, .8);
        dyeSubtree('M4xNME_enginebay',  0x1e2023, .92, .05, .15);
        /* Nút bấm trên nắp cốp dùng vật liệu Buttons xám 0,8 — nhuộm tối
           để cả cụm cốp đồng tông, không còn mảng sáng lạc lõng. */
        var trunkRoot = findNode('M4xNME_trunk_csl');
        if (trunkRoot) trunkRoot.traverse(function(o){
          if (!o.isMesh) return;
          var mats = Array.isArray(o.material)?o.material:[o.material];
          mats.forEach(function(m){ if (m.name === 'M4xNME_Buttons' && m.color){ m.color.setHex(0x17181a); m.roughness = .5; m.metalness = .2; m.needsUpdate = true; } });
        });
      }

      /* ============ MỞ CỬA / CA-PÔ / CỐP ============
         Model có group riêng cho cửa (door_FL/FR), ca-pô (hood_csl) và cốp
         (trunk_csl) nhưng gốc của các group đều ở tâm xe — xoay trực tiếp
         sẽ quay quanh tâm xe chứ không quanh bản lề. Cách sửa: tạo một
         Group "pivot" đặt đúng vị trí bản lề (suy từ bounding box thật:
         cửa = mép trước, ca-pô = mép sau sát kính, cốp = mép trước sát
         kính sau), rồi attach() các group vào pivot (attach giữ nguyên
         hình dạng/vị trí thế giới). Tappi cửa, gương và dải đèn hậu gắn
         trên nắp cốp đi cùng cụm tương ứng. Hướng xe: đầu +Z, đuôi −Z,
         cửa trái (FL) ở +X. */
      /* Cơ chế bản lề MỚI — không pivot, không attach(): bản cũ tạo group
         pivot rồi attach() các cụm vào; attach() tính lại transform local
         qua nhiều tầng scale/xoay (trong model còn có scale âm) khiến
         trục bản lề của CỐP lệch hẳn — cốp mở sai/kẹt, và basePos chụp
         lại sau attach làm nổ tung ghi đè vị trí của chính các cụm đó.
         Cách mới giữ nguyên cây phân cấp và transform gốc của mọi cụm;
         mỗi khung hình, vị trí của cụm được tính lại bằng công thức
         quay quanh bản lề trong không gian node cha:
           p' = hinge + q·(p − hinge),  quat' = q · quat gốc
         Mọi cụm mở (cửa, tappi, gương, ca-pô, cốp, ốp trong cốp, dải đèn
         hậu) đều là con trực tiếp của RootNode nên dùng chung một hinge
         cho cả cụm = chuyển động cứng tuyệt đối, không lệch, không cần
         attach. layoutAll() là nơi DUY NHẤT ghi position/quaternion cho
         các cụm di chuyển được, dùng chung cho mở nắp + nổ tung. */
      var movable = new Map();    // obj -> {base:Vector3, off:Vector3 (đã đổi về local)}
      var openerSets = [];        // {which, objs, hinge, axis, openVal, cur, target, orig:Map}
      var setByWhich = {};
      var explodeCur = 0, explodeTarget = 0;
      function findNode(name){
        var f = null;
        carRoot.traverse(function(o){ if (o.name === name && !f) f = o; });
        return f;
      }
      function setupOpeners(){
        openerSets = []; setByWhich = {};
        carRoot.updateMatrixWorld(true);
        /* Từng cụm mở được đăng ký độc lập: một cụm lỗi không kéo sập
           các cụm còn lại (bản cũ một lần throw là chết cả mở nắp lẫn
           nổ tung mà không hề báo lỗi). */
        function regSafe(which, names, axisWorld, openVal, hingeWorld){
          try { reg(which, names, null, axisWorld, openVal, hingeWorld); }
          catch(e){ showErr('Không gắn được bản lề cụm ' + which + ': ' + (e && e.message ? e.message : e)); }
        }
        function reg(which, names, hingeFrom, axisWorld, openVal, hingeWorld){
          var objs = names.map(findNode).filter(Boolean);
          if (!objs.length) return;
          var parent = objs[0].parent;
          if (!parent) return;
          var pq = new THREE.Quaternion(); parent.getWorldQuaternion(pq);
          var set = {
            which: which, objs: objs,
            hinge: parent.worldToLocal(hingeWorld.clone()),
            axis: axisWorld.clone().applyQuaternion(pq.clone().invert()).normalize(),
            openVal: openVal, cur: 0, target: 0, orig: new Map()
          };
          objs.forEach(function(o){ set.orig.set(o, {p: o.position.clone(), q: o.quaternion.clone()}); });
          openerSets.push(set);
          if (which === 'doors') { (setByWhich.doors = setByWhich.doors || []).push(set); }
          else setByWhich[which] = set;
        }
        function boxOf(name){ return new THREE.Box3().setFromObject(findNode(name)); }
        // Cửa: bản lề = mép trước của cánh cửa, trục dọc Y. Trái (+X) quay
        // −1,02 rad để mép sau văng ra +X; phải đối xứng.
        var bl = boxOf('M4xNME_door_FL'), cl = bl.getCenter(new THREE.Vector3());
        regSafe('doors', ['M4xNME_door_FL','M4xNME_doorpanel_FL','M4xNME_mirror_L'], new THREE.Vector3(0,1,0), -1.02,
            new THREE.Vector3(cl.x, cl.y, bl.max.z - 0.03));
        var br = boxOf('M4xNME_door_FR'), cr = br.getCenter(new THREE.Vector3());
        regSafe('doors', ['M4xNME_door_FR','M4xNME_doorpanel_FR','M4xNME_mirror_R'], new THREE.Vector3(0,1,0), 1.02,
            new THREE.Vector3(cr.x, cr.y, br.max.z - 0.03));
        // Ca-pô: bản lề = mép sau sát kính lái, ở chiều cao mặt trên nắp;
        // quay −0,62 quanh trục X (đầu xe +Z) nhấc mép trước lên.
        var bh = boxOf('M4xNME_hood_csl');
        regSafe('hood', ['M4xNME_hood_csl'], new THREE.Vector3(1,0,0), -0.62,
            new THREE.Vector3(0, bh.max.y - 0.02, bh.min.z + 0.04));
        // Cốp: bản lề = mép TRƯỚC–TRÊN của nắp cốp (sát kính sau). Bản cũ
        // lấy chiều cao ở TÂM nắp nên nắp quay kiểu "bập bênh", mép trước
        // chúc xuống khoang cốp và trông như gãy. Cụm mở gồm cả ốp trong
        // cốp (trunkint) và dải đèn hậu gắn trên nắp — bản cũ thiếu
        // trunkint nên mở cốp là tấm ốp đen ở lại lơ lửng che miệng cốp.
        var bt = boxOf('M4xNME_trunk_csl');
        regSafe('trunk', ['M4xNME_trunk_csl','M4xNME_tailgatelight_csl','M4xNME_trunkint'], new THREE.Vector3(1,0,0), 0.60,
            new THREE.Vector3(0, bt.max.y - 0.03, bt.max.z - 0.05));
      }
      function setOpen(which, open){
        var btnId = which==='doors' ? 'opendoors' : which==='hood' ? 'openhood' : 'opentrunk';
        var b = document.getElementById(btnId);
        if (b) b.setAttribute('aria-pressed', open ? 'true' : 'false');
        var sets = which==='doors' ? (setByWhich.doors || []) : (setByWhich[which] ? [setByWhich[which]] : []);
        sets.forEach(function(s){ s.target = open ? s.openVal : 0; });
        if (which === 'hood'){ hoodOpen = open; if (bayLight) bayLight.intensity = open ? 9 : 0; }
        needsRender = true;
      }
      /* Đăng ký mọi cụm di chuyển được cho layoutAll: vị trí gốc (chưa
         từng bị attach đụng vào) + vector nổ tung đã đổi sẵn về không
         gian local của node cha (qua quaternion/scale thế giới của cha,
         hệ số tách ×1,5 cho rõ mắt). Tính MỘT lần lúc tải model — từ đó
         slider/nút nổ tung và animation mở nắp chỉ thay hệ số, không
         bao giờ tính lại transform nên không tích lũy sai số. */
      function setupMovable(){
        movable = new Map();
        carRoot.updateMatrixWorld(true);
        function toLocalOffset(o, worldDir){
          var pq = new THREE.Quaternion(); o.parent.getWorldQuaternion(pq);
          var ps = new THREE.Vector3(); o.parent.getWorldScale(ps);
          var v = worldDir.clone().multiplyScalar(1.5).applyQuaternion(pq.invert());
          v.x /= (ps.x || 1); v.y /= (ps.y || 1); v.z /= (ps.z || 1);
          return v;
        }
        Object.keys(partObjects).forEach(function(id){
          var p = PARTS.filter(function(x){ return x.id === id; })[0];
          (partObjects[id] || []).forEach(function(o){
            if (!o.parent || movable.has(o)) return;
            var d = o.userData.explodeDir || (p ? new THREE.Vector3(p.explode[0], p.explode[1], p.explode[2]) : new THREE.Vector3());
            if (id === 'door'){
              /* Thân xe (M4xNME_body) thuộc cụm "Cửa & thân xe" để
                 highlight/chọn, nhưng khi NỔ TUNG nó phải ĐỨNG YÊN —
                 bản cũ cho cả vỏ thân xe trượt ngang 1,3 m theo cửa,
                 trông như xe gãy làm đôi. Chỉ cánh cửa tách ra hông,
                 vè trước tách nhẹ theo phía của nó. */
              if (o.name === 'M4xNME_body') return;
              var wp = new THREE.Vector3(); o.getWorldPosition(wp);
              var side = wp.x >= 0 ? 1 : -1;
              var amt = /door_F/.test(o.name) ? 0.85 : 0.4;
              d = new THREE.Vector3(side * amt, 0.05, 0);
            }
            movable.set(o, {base: o.position.clone(), off: toLocalOffset(o, d)});
          });
        });
        // Cụm mở nắp chưa có trong danh sách nổ tung (ốp trong cốp) thì
        // đi theo hướng của cụm chính, để mở/nổ không tách rời nhau
        var setDir = {hood: new THREE.Vector3(0, 0.85, 0.15), trunk: new THREE.Vector3(0, 0.55, -0.4)};
        openerSets.forEach(function(s){
          var d = setDir[s.which]; if (!d) return;
          s.objs.forEach(function(o){
            if (o.parent && !movable.has(o)) movable.set(o, {base: o.position.clone(), off: toLocalOffset(o, d)});
          });
        });
      }
      /* Nơi DUY NHẤT ghi position/quaternion cho cụm di chuyển được:
         vị trí = gốc + nổ tung, rồi (nếu thuộc cụm mở) quay quanh bản lề.
         Nhờ vậy mở nắp và nổ tung cộng dồn đúng, không ghi đè nhau —
         gốc lỗi "nổ tung không ăn" của bản cũ là hai cơ chế cùng ghi
         position theo hai hệ basePos khác nhau. */
      function layoutAll(){
        var q = new THREE.Quaternion(), tmp = new THREE.Vector3();
        var setOf = new Map();
        openerSets.forEach(function(s){ s.objs.forEach(function(o){ setOf.set(o, s); }); });
        movable.forEach(function(rec, o){
          tmp.copy(rec.off).multiplyScalar(explodeCur).add(rec.base);
          var s = setOf.get(o);
          if (s){
            var orig = s.orig.get(o);
            if (s.cur !== 0){
              q.setFromAxisAngle(s.axis, s.cur);
              tmp.sub(s.hinge).applyQuaternion(q).add(s.hinge);
              o.quaternion.copy(q).multiply(orig.q);
            } else {
              o.quaternion.copy(orig.q);
            }
          }
          o.position.copy(tmp);
        });
        if (renderer) renderer.shadowMap.needsUpdate = true;
        needsRender = true;
      }

      /* ============ CÁNH GIÓ DUCKTAIL CSL — DỰNG THÊM THEO MÔ TẢ ============
         Model GLB gốc KHÔNG có cánh gió, trong khi mô tả cụm cốp sau ghi
         "cánh gió ducktail carbon" — không khớp. Theo lựa chọn của người
         dùng, trang tự dựng lip ducktail (kiểu CSL thật: gờ carbon liền
         khối vếch lên ở mép sau nắp cốp, không phải cánh gió rời) bằng
         hình học three.js:
         - Bề rộng và chiều cao bám theo bounding box thật của trunk_csl,
           chiều cao mặt cốp được lấy mẫu từ đỉnh thật của hình học ở
           dải sau và dải trước của nắp để lip không bị lơ lửng/chìm.
         - Profile cong vếch lên ở mép sau, đùn ngang, bo mép bằng bevel.
         - Vật liệu carbon riêng, KHÔNG đăng ký vào paintMats nên đổi
           màu sơn không nhuộm theo.
         - Gắn bằng attach() vào chính group trunk_csl: cụm cốp quay
           quanh bản lề bằng công thức ở layoutAll() nên mở cốp thì cánh
           gió đi theo cốp, nổ tung thì nó đi theo cụm cốp, bấm lên cánh
           gió chọn đúng cụm cốp.
         - Chiều cao mặt nắp chỉ lấy mẫu từ mesh SƠN của nắp (tránh đỉnh
           logo/đèn hậu nằm trên nắp làm lip bị đội lên lơ lửng). */
      function setupSpoiler(){
        var trunk = findNode('M4xNME_trunk_csl');
        if (!trunk) return;
        carRoot.updateMatrixWorld(true);
        var box = new THREE.Box3().setFromObject(trunk);
        var size = box.getSize(new THREE.Vector3());
        var zr = box.min.z; // mép sau cùng của nắp cốp (đuôi xe ở -Z)
        // Lấy mẫu chiều cao mặt cốp thật: dải sau (sát mép) và dải trước của lip
        var ytRear = -Infinity, ytFront = -Infinity;
        trunk.traverse(function(m){
          if (!m.isMesh || !m.geometry || !m.geometry.attributes.position) return;
          if ((m.name || '').indexOf('_Paint_') < 0) return; // chỉ mặt sơn của nắp mới là mặt chuẩn đặt lip
          var pos = m.geometry.attributes.position, v = new THREE.Vector3();
          for (var i = 0; i < pos.count; i += 5){
            v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
            if (v.z <= zr + 0.10 && v.y > ytRear) ytRear = v.y;
            if (v.z >= zr + 0.28 && v.z <= zr + 0.44 && v.y > ytFront) ytFront = v.y;
          }
        });
        if (!isFinite(ytRear)) ytRear = box.max.y;
        if (!isFinite(ytFront)) ytFront = box.max.y;
        var ytMid = (ytRear + ytFront) / 2;
        var W = size.x * 0.94;
        // Profile trong mặt phẳng (z, y) của xe; shape của ExtrudeGeometry
        // dùng x = -z để sau rotateY(90°) trục đùn thành bề ngang X.
        var prof = [
          [zr + 0.36, ytFront - 0.050],
          [zr + 0.335, ytFront - 0.008],
          [zr + 0.22, ytMid + 0.020],
          [zr + 0.10, ytRear + 0.045],
          [zr + 0.02, ytRear + 0.082],
          [zr - 0.008, ytRear + 0.020],
          [zr + 0.05, ytRear - 0.040]
        ];
        var shape = new THREE.Shape();
        prof.forEach(function(pt, i){
          if (i === 0) shape.moveTo(-pt[0], pt[1]); else shape.lineTo(-pt[0], pt[1]);
        });
        shape.closePath();
        var geo = new THREE.ExtrudeGeometry(shape, {depth: W, steps: 1, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2});
        geo.rotateY(Math.PI / 2);
        geo.translate(-W / 2, 0, 0);
        var mat = new THREE.MeshStandardMaterial({color: 0x17181a, roughness: 0.32, metalness: 0.25, side: THREE.DoubleSide});
        mat.envMapIntensity = 0.7;
        var sp = new THREE.Mesh(geo, mat);
        sp.castShadow = true;
        sp.userData.partId = 'trunk';
        scene.add(sp);
        carRoot.updateMatrixWorld(true);
        trunk.attach(sp); // giữ nguyên hình dạng thế giới, từ nay đi theo cốp
        allMeshes.push(sp); // X-ray / highlight / raycast nhận như một phần của cốp
        if (renderer) renderer.shadowMap.needsUpdate = true;
        needsRender = true;
      }

      /* Chùm sáng thật khi bật đèn: 2 spotlight từ vị trí đèn pha chiếu về
         phía trước (+Z) và 1 point light đỏ ở đuôi. Vị trí lấy từ tâm cụm
         đèn thật của model sau khi đã chuẩn hóa. */
      function setupBeams(){
        var hc = partCenter('headlight');
        if (hc){
          [-0.62, 0.62].forEach(function(off, idx){
            var sp = new THREE.SpotLight(0xffe2ae, 90, 22, 0.46, 0.55, 1.4);
            sp.position.set(hc.center.x + off, hc.center.y, hc.center.z + 0.05);
            sp.target.position.set(hc.center.x + off, 0.1, hc.center.z + 10);
            sp.visible = false;
            scene.add(sp); scene.add(sp.target);
            if (idx === 0) beamL = sp; else beamR = sp;
          });
        }
        var tc = partCenter('taillight');
        if (tc){
          tailGlow = new THREE.PointLight(0xff2a22, 6, 5, 1.6);
          tailGlow.position.set(tc.center.x, tc.center.y, tc.center.z - 0.25);
          tailGlow.visible = false;
          scene.add(tailGlow);
        }
        /* Đèn soi khoang máy: chỉ sáng khi ca-pô mở, chiếu thẳng vào khối
           động cơ để mở nắp là thấy rõ máy, không còn mảng tối/trắng bệt. */
        var ec = partCenter('engine');
        if (ec){
          bayLight = new THREE.PointLight(0xfff1d6, 0, 4.5, 1.5);
          bayLight.position.set(ec.center.x, ec.center.y + 0.85, ec.center.z + 0.35);
          scene.add(bayLight);
        }
      }

      /* Áp trạng thái đèn lên vật liệu: pha/DRL sáng trắng ấm + vàng,
         đèn hậu sáng đỏ, tắt thì khôi phục emissive gốc của model.
         Vật liệu đang được highlight (_hl) thì bỏ qua — clearHighlight
         sẽ gọi lại hàm này sau khi khôi phục để trạng thái luôn khớp. */
      function applyLights(){
        frontLightMats.forEach(function(m){
          if (m.userData._hl) return;
          if (lightsOn){ m.emissive.setHex(/runningY/.test(m.name||'') ? 0xffc21f : 0xffe9b0); m.emissiveIntensity = 2.0; }
          else { m.emissive.setHex(m.userData._e0 || 0); m.emissiveIntensity = (m.userData._ei0 != null ? m.userData._ei0 : 1); }
        });
        rearLightMats.forEach(function(m){
          if (m.userData._hl) return;
          if (lightsOn){ m.emissive.setHex(0xff2020); m.emissiveIntensity = 1.8; }
          else { m.emissive.setHex(m.userData._e0 || 0); m.emissiveIntensity = (m.userData._ei0 != null ? m.userData._ei0 : 1); }
        });
        if (beamL) beamL.visible = lightsOn;
        if (beamR) beamR.visible = lightsOn;
        if (tailGlow) tailGlow.visible = lightsOn;
        needsRender = true;
      }

      /* ============ TƯƠNG TÁC ============ */
      function clearHighlight(){
        allMeshes.forEach(function(m){
          var mats = Array.isArray(m.material)?m.material:[m.material];
          mats.forEach(function(mm){ if(mm.userData._hl){ mm.emissive && mm.emissive.setHex(mm.userData._e||0x000000); mm.emissiveIntensity = mm.userData._ei||1; delete mm.userData._hl; } });
        });
        applyLights(); // khôi phục xong thì áp lại trạng thái đèn hiện tại (bản cũ làm đèn tắt dù nút vẫn "Bật")
        needsRender = true;
      }
      function highlight(pid){
        clearHighlight();
        allMeshes.forEach(function(m){
          if (m.userData.partId !== pid) return;
          if (pid === 'engine' && m.userData.bay) return; // chỉ nhuộm khối động cơ + đường nạp, không nhuộm cả thành khoang
          var mats = Array.isArray(m.material)?m.material:[m.material];
          mats.forEach(function(mm){
            if (!mm.emissive) return;
            mm.userData._hl = true; mm.userData._e = mm.emissive.getHex(); mm.userData._ei = mm.emissiveIntensity;
            mm.emissive.setHex(0xc8102e); mm.emissiveIntensity = 0.55;
          });
        });
        needsRender = true;
      }
      function flyTo(center, dist, heightFrac){
        var dir = camera.position.clone().sub(controls.target);
        if (dir.lengthSq() < 0.001) dir.set(1,0.4,1);
        dir.normalize();
        var dest = center.clone().add(dir.multiplyScalar(dist));
        dest.y = Math.max(dest.y, center.y + dist*(heightFrac||0.25));
        fly = {t:0, fromP:camera.position.clone(), toP:dest, fromT:controls.target.clone(), toT:center.clone()};
        controls.autoRotate = false; document.getElementById('spin').setAttribute('aria-pressed','false');
      }
      function partCenter(pid){
        var box = new THREE.Box3(), found=false;
        allMeshes.forEach(function(m){ if(m.userData.partId===pid){ box.union(new THREE.Box3().setFromObject(m)); found=true; } });
        if (!found) return null;
        return {center: box.getCenter(new THREE.Vector3()), size: box.getSize(new THREE.Vector3())};
      }
      function selectPart(id, flyCam){
        var p = PARTS.filter(function(x){return x.id===id;})[0]; if(!p) return;
        selected = id;
        Object.keys(btnById).forEach(function(k){ btnById[k].setAttribute('aria-pressed', k===id?'true':'false'); });
        document.getElementById('d-sys').textContent = systemLabel(p.sys);
        document.getElementById('d-name').textContent = partLabel(p);
        document.getElementById('d-desc').textContent = partField(p,'desc');
        document.getElementById('d-fn').textContent = partField(p,'fn');
        document.getElementById('d-mat').textContent = partField(p,'mat');
        document.getElementById('d-spec').textContent = partField(p,'spec');
        document.getElementById('d-note').textContent = partField(p,'note');
        document.getElementById('d-dl').hidden = false;
        highlight(id);
        if (id === 'engine' && carRoot) setOpen('hood', true); // xem động cơ thì tự mở ca-pô
        if (flyCam){
          var pc = partCenter(id);
          if (pc){
            var d = Math.max(pc.size.x, pc.size.y, pc.size.z);
            // Không bay gần hơn minDistance của OrbitControls (2,2) — bản
            // cũ xin 1,6 nên controls kẹp lại gây giật camera khi tới nơi
            flyTo(pc.center, Math.min(Math.max(d*1.6, 2.4), 6), 0.3);
          }
        }
        // Không tự cuộn xuống bảng chi tiết nữa (xe bị đẩy khỏi màn hình
        // điện thoại) — hiện chip "Chi tiết" cố định để người dùng tự nhảy
        var chip = document.getElementById('toDetail');
        chip.querySelector('span').textContent = partLabel(p);
        chip.hidden = false;
        var sb = document.getElementById('selbar');
        document.getElementById('sb-name').textContent = partLabel(p);
        document.getElementById('sb-spec').textContent = partField(p,'spec');
        sb.hidden = false;
        // Mở sẵn nhóm chứa bộ phận vừa chọn để danh sách khớp với chi tiết
        var det = groupsEl.querySelector('[data-sys="' + p.sys + '"] details');
        if (det) det.open = true;
      }
      var downPos = null;
      function onCanvasClick(ev){
        if (!carRoot) return;
        if (fly) return;
        /* Kéo để xoay xong thả chuột trình duyệt vẫn bắn 'click' — nếu
           con trỏ đã di chuyển quá 6px thì đó là thao tác xoay, không
           phải bấm chọn bộ phận (bản cũ chọn nhầm + camera tự bay). */
        if (downPos && Math.hypot(ev.clientX-downPos.x, ev.clientY-downPos.y) > 6) return;
        var rect = renderer.domElement.getBoundingClientRect();
        var mouse = new THREE.Vector2(((ev.clientX-rect.left)/rect.width)*2-1, -((ev.clientY-rect.top)/rect.height)*2+1);
        var ray = new THREE.Raycaster();
        ray.setFromCamera(mouse, camera);
        var hits = ray.intersectObjects(allMeshes, false);
        for (var i=0;i<hits.length;i++){
          var pid = hits[i].object.userData.partId;
          if (pid){ selectPart(pid, true); return; }
        }
      }

      /* Sơn */
      var swEl = document.getElementById('swatches');
      PAINTS.forEach(function(p, i){
        var b = document.createElement('button'); b.className='sw';
        var hexStr = '#'+p.hex.toString(16).padStart(6,'0').toUpperCase();
        b.style.background = hexStr;
        b.title = p.name+' ('+hexStr+')'; b.setAttribute('aria-label',msg('Sơn: ','Paint: ')+p.name+' '+hexStr);
        b.setAttribute('aria-pressed', i===0?'true':'false');
        b.addEventListener('click', function(){ setPaint(i); });
        swEl.appendChild(b);
      });
      function setPaint(i){
        var p = PAINTS[i];
        paintMats.forEach(function(m){
          if (m.color) m.color.setHex(p.hex);
          m.roughness = p.rough; m.metalness = p.metal;
          if ('clearcoat' in m){ m.clearcoat = 0.6; m.clearcoatRoughness = 0.3; }
          m.envMapIntensity = 0.55;
          m.needsUpdate = true;
        });
        // Hiện cả mã màu để đối chiếu: màu trên xe phải đúng mã này
        document.getElementById('paintname').textContent = p.name+' · #'+p.hex.toString(16).padStart(6,'0').toUpperCase();
        Array.prototype.forEach.call(swEl.children, function(b, j){ b.setAttribute('aria-pressed', j===i?'true':'false'); });
        needsRender = true;
      }

      /* Góc nhìn — theo trục thật của model: đầu xe +Z, đuôi −Z, hông ±X.
         Bản cũ đặt "Hông" ở +Z (ra hình đầu xe) và "Đầu xe" ở +X (ra hình
         hông xe) — hai nút hoán đổi cho nhau; "Khoang máy" lại nhắm vào
         x=1,15 (trúng cánh cửa) trong khi động cơ nằm giữa xe, z≈+1,3–1,5. */
      var VIEWS = {
        hero:  {p:[4.55,1.75,5.35], t:[0,0.62,0]},
        side:  {p:[7.6,1.0,0],    t:[0,0.62,0]},
        rear:  {p:[0,1.45,-8.0],  t:[0,0.65,0]},
        front: {p:[0,1.2,8.0],    t:[0,0.62,0]},
        top:   {p:[0.7,9.6,0.7],  t:[0,0.3,0]},
        engine:{p:[2.7,2.5,5.0],  t:[0,0.85,1.5]}
      };
      document.querySelectorAll('.viewbtn').forEach(function(b){
        b.addEventListener('click', function(){
          document.querySelectorAll('.viewbtn').forEach(function(x){x.setAttribute('aria-pressed','false');});
          b.setAttribute('aria-pressed','true');
          controls.autoRotate = false; document.getElementById('spin').setAttribute('aria-pressed','false');
          if (b.dataset.view === 'engine'){
            setOpen('hood', true); // xem khoang máy thì tự mở ca-pô
            var pc = partCenter('engine');
            if (pc){ flyTo(pc.center, 3.6, 0.5); return; }
          }
          var v = VIEWS[b.dataset.view];
          fly = {t:0, fromP:camera.position.clone(), toP:new THREE.Vector3(v.p[0],v.p[1],v.p[2]), fromT:controls.target.clone(), toT:new THREE.Vector3(v.t[0],v.t[1],v.t[2])};
        });
      });

      /* Toggle */
      /* X-ray: làm mờ TOÀN BỘ vỏ ngoài (mọi mesh không thuộc hệ cơ khí /
         nội thất) thay vì chỉ vật liệu tên *Paint như bản cũ — ca-pô và
         trần carbon, viền nhựa đen… trước đây vẫn đặc nên "xuyên" lỗ chỗ.
         Trạng thái gốc của từng vật liệu được lưu và khôi phục đúng y
         nguyên khi tắt (bản cũ ép kính về opacity 0,45 bất kể gốc). */
      var XRAY_KEEP = {engine:1, strutbrace:1, cooling:1, gearbox:1, diff:1, exhaust:1, suspension:1, brake:1, wheel:1, seat:1, cockpit:1};
      document.getElementById('xray').addEventListener('click', function(){
        xray = !xray; this.setAttribute('aria-pressed', xray?'true':'false');
        allMeshes.forEach(function(m){
          // Thành khoang máy (enginebay) mờ theo thân xe dù thuộc part
          // "engine" — giữ đặc thì nó phủ kín khối động cơ bên trong
          if (XRAY_KEEP[m.userData.partId] && !m.userData.bay) return;
          var mats = Array.isArray(m.material)?m.material:[m.material];
          mats.forEach(function(mm){
            if (xray){
              if (!mm.userData._xr) mm.userData._xr = {t:mm.transparent, o:mm.opacity, d:mm.depthWrite};
              mm.transparent = true;
              mm.opacity = /GlassClear/.test(mm.name||'') ? 0.06 : 0.15;
              mm.depthWrite = false; mm.needsUpdate = true;
            } else if (mm.userData._xr){
              mm.transparent = mm.userData._xr.t; mm.opacity = mm.userData._xr.o; mm.depthWrite = mm.userData._xr.d;
              mm.needsUpdate = true;
            }
          });
        });
        needsRender = true;
      });
      document.getElementById('spin').addEventListener('click', function(){
        controls.autoRotate = !controls.autoRotate;
        this.setAttribute('aria-pressed', controls.autoRotate?'true':'false');
      });
      document.getElementById('lights').addEventListener('click', function(){
        lightsOn = !lightsOn; this.setAttribute('aria-pressed', lightsOn?'true':'false');
        applyLights();
      });
      /* Nút mở cửa / ca-pô / cốp */
      [['opendoors','doors'],['openhood','hood'],['opentrunk','trunk']].forEach(function(pair){
        document.getElementById(pair[0]).addEventListener('click', function(){
          setOpen(pair[1], this.getAttribute('aria-pressed') !== 'true');
        });
      });
      document.getElementById('reset').addEventListener('click', function(){
        selected = null; clearHighlight();
        document.getElementById('toDetail').hidden = true;
        Object.keys(btnById).forEach(function(k){ btnById[k].setAttribute('aria-pressed','false'); });
        document.getElementById('explode').value = 0; applyExplode(0);
        if (xray) document.getElementById('xray').click();
        if (lightsOn) document.getElementById('lights').click();
        setOpen('doors', false); setOpen('hood', false); setOpen('trunk', false);
        document.getElementById('selbar').hidden = true;
        var v = VIEWS.hero;
        fly = {t:0, fromP:camera.position.clone(), toP:new THREE.Vector3(v.p[0],v.p[1],v.p[2]), fromT:controls.target.clone(), toT:new THREE.Vector3(v.t[0],v.t[1],v.t[2])};
        document.getElementById('d-sys').textContent = msg('Chưa chọn bộ phận','No part selected');
        document.getElementById('d-name').textContent = msg('Bấm vào một bộ phận trên xe','Select a part of the car');
        document.getElementById('d-desc').textContent = msg('Mỗi cụm bấm được sẽ sáng lên, camera bay tới gần và hiện chi tiết ở đây: chức năng, vật liệu và thông số của đúng cụm đó trên bản M4 CSL — phần Đạt thích “mổ xẻ” nhất khi ngắm một chiếc xe.','Select a part to highlight it, move the camera closer and see its function, materials and specifications.');
        document.getElementById('d-dl').hidden = true;
      });
      /* Nổ tung: slider/nút chỉ đặt MỨC ĐÍCH (explodeTarget); vòng lặp
         animate nội suy explodeCur về đích rồi gọi layoutAll() — cùng
         một đường ghi position duy nhất với cơ chế mở nắp, và chuyển
         động diễn ra từ từ nên mắt thấy rõ từng cụm tách ra (bản cũ áp
         tức thời qua một hệ basePos riêng, vừa xung đột với pivot mở
         nắp vừa khó nhận ra đã ăn hay chưa). */
      function applyExplode(f){
        explodeTarget = f;
        var lbl = document.getElementById('explodeval');
        if (lbl) lbl.textContent = Math.round(f * 100) + '%';
        var eb = document.getElementById('explodebtn');
        if (eb) eb.textContent = f > 0.5 ? msg('Ráp lại','Reassemble') : msg('Tách hết','Explode');
        needsRender = true;
      }
      document.getElementById('explode').addEventListener('input', function(){ applyExplode(this.value/100); });
      document.getElementById('explodebtn').addEventListener('click', function(){
        var on = explodeTarget < 0.5;
        document.getElementById('explode').value = on ? 100 : 0;
        applyExplode(on ? 1 : 0);
      });

      /* Vòng lặp — RENDER THEO YÊU CẦU: model 1,24 triệu đỉnh vẽ lại mỗi
         khung hình sẽ chiếm hết CPU (nhất là WebGL phần mềm) khiến trang
         nghẽn, trình duyệt không xử lý nổi cuộn/chụp hình. Chỉ vẽ khi có
         thay đổi: tự xoay đang bật, camera đang bay, hoặc needsRender được
         đặt bởi một thao tác (chọn part, đổi sơn, nổ tung, resize…). */
      var clock = new THREE.Clock();
      var needsRender = true;
      function animate(){
        requestAnimationFrame(animate);
        try {
          var dt = Math.min(clock.getDelta(), 0.05);
          if (fly){
            fly.t += dt/1.1;
            var k = fly.t>=1 ? 1 : (1-Math.pow(1-fly.t,3));
            camera.position.lerpVectors(fly.fromP, fly.toP, k);
            controls.target.lerpVectors(fly.fromT, fly.toT, k);
            if (fly.t>=1) fly = null;
            needsRender = true;
          }
          // Animation mở/đóng cửa, ca-pô, cốp + nổ tung: tiến dần về
          // đích rồi ghi transform qua layoutAll() (đường ghi duy nhất)
          var layoutDirty = false;
          openerSets.forEach(function(s){
            if (s.cur !== s.target){
              var d = s.target - s.cur;
              var step = reduceMotion ? Math.abs(d) : dt * 2.4;
              s.cur += Math.abs(d) <= step ? d : (d > 0 ? step : -step);
              layoutDirty = true;
            }
          });
          if (explodeCur !== explodeTarget){
            var ed = explodeTarget - explodeCur;
            var estep = reduceMotion ? Math.abs(ed) : dt * 1.8;
            explodeCur += Math.abs(ed) <= estep ? ed : (ed > 0 ? estep : -estep);
            layoutDirty = true;
          }
          if (layoutDirty) layoutAll();
          if (controls) controls.update();
          if (renderer && (needsRender || (controls && controls.autoRotate))){
            renderer.render(scene, camera);
            needsRender = false;
          }
        } catch(e){ showErr(e.message); }
      }

      /* three.min.js được nạp ĐỒNG BỘ bằng thẻ <script src> ngay phía trên,
         nên THREE chắc chắn đã tồn tại khi khối này chạy. (Bản trước nạp bất
         đồng bộ ở cuối khối trong khi `new THREE.Clock()` ở trên chạy ngay —
         lỗi "THREE is not defined" giết chết toàn bộ script trước khi thẻ
         tải thư viện kịp được chèn, nên xe không bao giờ hiện.) */
      if (!window.THREE) {
        showErr('Không tải được thư viện three.js (assets/three.min.js).');
        document.getElementById('loadmsg').textContent = 'Thư viện 3D chưa tải được — kiểm tra mạng rồi tải lại trang.';
        return;
      }
      /* Hoãn khởi tạo WebGL sang sau DOMContentLoaded: tạo renderer + PMREM
         ngay trong lúc parser chạy sẽ chặn sự kiện tải trang (audit và máy
         yếu bị timeout ở màn hình chờ). THREE đã có sẵn nên không còn lỗi
         thứ tự như bản async trước. */
      function start3D(){
        document.getElementById('loadmsg').textContent = 'Đang tải model M4 CSL… file GLB 7 MB.';
        try { init(); }
        catch(e){
          showErr('Không khởi tạo được 3D: ' + (e && e.message ? e.message : e));
          document.getElementById('loadmsg').textContent = 'Không khởi tạo được khung 3D trên thiết bị này. Danh sách bộ phận vẫn xem được ở cột bên phải.';
        }
      }
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(start3D, 0); });
      else setTimeout(start3D, 0);
    })();