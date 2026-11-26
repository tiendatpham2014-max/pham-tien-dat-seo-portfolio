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
         patterns:[/M4xNME_engine$/,/_engine_M4/,/intake/], explode:[0,0.7,0.3],
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
      // These are separate root groups in the GLB but are absent from the
      // handbook's twenty named assemblies. Keep the body/tub/engine bay as
      // the fixed chassis; detach the remaining visible pieces with their
      // nearest assembly so "Explode" does not leave panels behind.
      var EXTRA_GROUPS = [
        {name:'M4xNME_fenderint', part:'door', dir:[-0.65,0.24,0.45]},
        {name:'M4xNME_bumperbar_F', part:'grille', dir:[0,0.22,1.08]},
        {name:'M4xNME_reinforcement_R', part:'door', dir:[0,0.3,-1.15]},
        {name:'M4xNME_fueltank', part:null, dir:[-0.85,0.35,-0.3]},
        {name:'M4xNME_heatshield', part:'exhaust', dir:[-0.7,0.28,-0.45]},
        {name:'M4xNME_hub_F', part:'suspension', dir:[0.75,0.22,0.16]},
        {name:'M4xNME_hub_R', part:'suspension', dir:[0.75,0.22,-0.16]},
        {name:'M4xNME_undertray', part:'diffuser', dir:[0.55,0.24,-0.45]},
        {name:'M4xNME_windshield', part:'door', dir:[0,1.02,0.35]},
        {name:'M4xNME_turn_signal_stalk', part:'cockpit', dir:[0.4,0.78,0.12]},
        {name:'M4xNME_sideskirt', part:'door', dir:[0.78,0.24,0]},
        {name:'M4xNME_sideglass_R', part:'door', dir:[-0.78,0.48,0]},
        {name:'M4xNME_sideglass_L', part:'door', dir:[0.78,0.48,0]},
        {name:'M4xNME_doorglass_FR', part:'door', dir:[-0.85,0.1,0]},
        {name:'M4xNME_doorglass_FL', part:'door', dir:[0.85,0.1,0]},
        {name:'M4xNME_bumper_R', part:'door', dir:[0,0.35,-1.15]},
        {name:'M4xNME_backlight', part:'door', dir:[0,0.9,-0.45]},
        {name:'M4xNME_bumperline_R_csl', part:'door', dir:[0,0.35,-1.15]},
        {name:'M4xNME_sideskirtline_csl', part:'door', dir:[0.78,0.24,0]}
      ];
      var extraByName = {};
      EXTRA_GROUPS.forEach(function(group){ extraByName[group.name] = group; });
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

      var WHEEL_FINISHES = [
        {name:'Đen nhám (Zin)', en:'Matte Black (OEM)', hex:0x26292e, rough:0.36, metal:0.55},
        {name:'Vàng đồng 827M', en:'Gold Bronze 827M', hex:0xc49545, rough:0.30, metal:0.78},
        {name:'Bạc sáng', en:'Bright Silver', hex:0xd8dde4, rough:0.24, metal:0.85},
        {name:'Xám Gunmetal', en:'Gunmetal Grey', hex:0x5b626b, rough:0.28, metal:0.76}
      ];
      var CALIPER_COLORS = [
        {name:'Đỏ M (Zin)', en:'M Red (OEM)', hex:0xb81224, rough:0.28, metal:0.35},
        {name:'Vàng Carbon-Ceramic', en:'Carbon-Ceramic Gold', hex:0xd69a1e, rough:0.26, metal:0.45},
        {name:'Xanh M Blue', en:'M Blue', hex:0x1659b8, rough:0.28, metal:0.38},
        {name:'Đen Stealth', en:'Stealth Black', hex:0x1b1e22, rough:0.36, metal:0.30}
      ];
      var CSL_WEIGHT_IDS = {hood:1, roof:1, trunk:1, seat:1, exhaust:1, brake:1, strutbrace:1};

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
         Tabs sticky và nút Chi tiết trong khung xe đảm nhiệm điều hướng;
         không dùng chip fixed che các điều khiển ở đáy màn hình. */
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
      var groundMesh = null, discMesh = null, environmentFloor = null;
      var pmremGenerator = null, defaultEnvironment = null, environmentRoot = null, environmentShell = null, garageShellCache = null;
      var keyLight = null, fillLight = null, rimLight = null, ambientLight = null;
      var activeEnvironment = 'none', environmentRequest = 0, environmentModels = {};
      var paintMats = [], wheelRimMats = [], caliperMats = [], glassMats = [], frontLightMats = [], rearLightMats = [], allMeshes = [];
      var beamL = null, beamR = null, beamCones = [], tailGlow = null, bayLight = null;
      var openers = [], doorOps = [], hoodOp = null, trunkOp = null;
      var partObjects = {};   // id -> [Object3D group nodes]
      var basePos = new Map();
      var bayMeshes = []; var bayGroup = null; var hoodOpen = false;
      var selected = null, xray = false, cslWeightMode = false, lightsOn = false, aeroOn = false;
      var wheelCorners = [], steerWheelObjs = [], steerCur = 0, steerTarget = 0;
      var aeroGroup = null, aeroStreams = [];
      var tourActive = false, tourStep = 0, tourTimer = 0;
      var selectionReveal = false, selectionAutoXray = false, selectionOpenedHood = false;
      var fly = null;
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var defaultAutoRotate = false;

      function isDark(){ var t=document.documentElement.dataset.theme; return t ? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; }
      var themeToggle=document.getElementById('theme-toggle');
      if(themeToggle) themeToggle.addEventListener('click',function(){
        var next=isDark()?'light':'dark';
        document.documentElement.dataset.theme=next;
        try { localStorage.setItem('dat-seo-theme',next); } catch(e){}
        if(scene){
          if(activeEnvironment==='none'){
            var bg=next==='dark'?0x101216:0xdfe3e7;
            scene.background.setHex(bg); scene.fog.color.setHex(bg);
            if(groundMesh) groundMesh.material.color.setHex(next==='dark'?0x171a1f:0xc9ced4);
            if(discMesh) discMesh.material.color.setHex(next==='dark'?0x1e2229:0xb9bfc7);
          }
          needsRender=true;
        }
      });

      var environmentSelect = document.getElementById('environment');
      var environmentStatus = document.getElementById('environment-status');
      var garageControls = document.getElementById('garage-controls');
      var garageLightButtons = document.querySelectorAll('[data-garage-light]');
      var garageLightPreset = 'warm';
      var garageDoors = {front:{cur:0,target:0},rear:{cur:0,target:0}};
      var GARAGE_LIGHTS = {warm:0xffad62,neutral:0xf5f2ec,cool:0xa6d5ff,blue:0x5685ff};
      var garageLightCurrent = null, garageLightTarget = null;
      var ENVIRONMENTS = {
        garage:{file:'parking_garage_free_download.glb',background:0x777d7c,key:1.25,fill:0.72,rim:0.65,ambient:0.48,keyColor:0xf4f0e7,fillColor:0xdde2e6},
        station:{file:'abandoned_gas_station.glb',background:0xb0a69a,key:2.1,fill:0.7,rim:0.6,ambient:0.65,keyColor:0xffdfb9,fillColor:0xdde5ef}
      };
      function garageConcreteTexture(){
        var canvas=document.createElement('canvas');
        canvas.width=512; canvas.height=512;
        var ctx=canvas.getContext('2d');
        ctx.fillStyle='#999790'; ctx.fillRect(0,0,512,512);
        var seed=1937;
        function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
        // Broad stains and fine aggregate give the new surfaces the same
        // weathered concrete character as the downloaded floor and columns.
        for(var i=0;i<190;i++){
          var x=random()*512,y=random()*512,r=14+random()*78;
          var shade=random()<0.56?'35,37,38':'225,219,204';
          var gradient=ctx.createRadialGradient(x,y,0,x,y,r);
          gradient.addColorStop(0,'rgba('+shade+','+(0.025+random()*0.055)+')');
          gradient.addColorStop(1,'rgba('+shade+',0)');
          ctx.fillStyle=gradient; ctx.fillRect(x-r,y-r,r*2,r*2);
        }
        for(var grain=0;grain<5600;grain++){
          var value=random()<0.57?'26,30,32':'234,229,218';
          ctx.fillStyle='rgba('+value+','+(0.025+random()*0.08)+')';
          var size=0.5+random()*1.5;
          ctx.fillRect(random()*512,random()*512,size,size);
        }
        var texture=new THREE.CanvasTexture(canvas);
        texture.colorSpace=THREE.SRGBColorSpace;
        texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
        texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
        return texture;
      }
      function makeGarageShell(root){
        var bounds=new THREE.Box3().setFromObject(root);
        var width=bounds.max.x-bounds.min.x, depth=bounds.max.z-bounds.min.z;
        var height=bounds.max.y+0.18;
        var shell=new THREE.Group();
        var tintSurfaces=[];
        function tintSurface(material,strength){tintSurfaces.push({material:material,base:material.color.clone(),strength:strength});}
        var concrete=garageConcreteTexture();
        var textureLoader=new THREE.TextureLoader();
        var floorMap=concrete.clone();
        floorMap.repeat.set(width/3.5,depth/3.5);
        floorMap.needsUpdate=true;
        var floorMaterial=new THREE.MeshStandardMaterial({map:floorMap,color:0xb7b9b8,roughness:0.98,metalness:0});
        tintSurface(floorMaterial,0.58);
        function floorTexture(file,property,isColor){
          textureLoader.load(new URL('materials/'+file,modelUrl()).href,function(texture){
            texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
            texture.repeat.set(width/3.5,depth/3.5);
            texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
            if(isColor)texture.colorSpace=THREE.SRGBColorSpace;
            floorMaterial[property]=texture;
            floorMaterial.needsUpdate=true;
            needsRender=true;
          });
        }
        floorTexture('concrete_floor_rough_1k.jpg','roughnessMap',false);
        floorTexture('concrete_floor_nor_gl_1k.jpg','normalMap',false);
        floorMaterial.normalScale=new THREE.Vector2(0.18,0.18);
        var matteFloor=new THREE.Mesh(new THREE.PlaneGeometry(width+0.1,depth+0.1),floorMaterial);
        matteFloor.rotation.x=-Math.PI/2;
        matteFloor.position.set((bounds.min.x+bounds.max.x)/2,0.012,(bounds.min.z+bounds.max.z)/2);
        matteFloor.receiveShadow=true;
        shell.add(matteFloor);
        var seamMat=new THREE.MeshBasicMaterial({color:0x575956,side:THREE.FrontSide});
        var baseMat=new THREE.MeshStandardMaterial({color:0x71716d,roughness:0.95,side:THREE.FrontSide});
        var beamMat=new THREE.MeshStandardMaterial({color:0x60625f,roughness:0.94,metalness:0});
        var steelMat=new THREE.MeshStandardMaterial({color:0x343a3c,roughness:0.68,metalness:0.48});
        var cabinetMat=new THREE.MeshStandardMaterial({color:0x454d50,roughness:0.72,metalness:0.28});
        var trimMat=new THREE.MeshStandardMaterial({color:0x9d8060,roughness:0.82,metalness:0.08});
        function panel(group,w,h,d,x,y,z,material){
          var mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
          mesh.position.set(x,y,z); mesh.receiveShadow=true; group.add(mesh);
          return mesh;
        }
        var shutterCanvas=document.createElement('canvas');
        shutterCanvas.width=8; shutterCanvas.height=64;
        var shutterContext=shutterCanvas.getContext('2d');
        var shutterFade=shutterContext.createLinearGradient(0,0,0,64);
        shutterFade.addColorStop(0,'#788184');
        shutterFade.addColorStop(0.72,'#606a6d');
        shutterFade.addColorStop(0.91,'#444e51');
        shutterFade.addColorStop(1,'#2e373a');
        shutterContext.fillStyle=shutterFade; shutterContext.fillRect(0,0,8,64);
        function makeShutter(w,h,z){
          var texture=new THREE.CanvasTexture(shutterCanvas);
          texture.wrapT=THREE.RepeatWrapping;
          texture.colorSpace=THREE.SRGBColorSpace;
          var material=new THREE.MeshStandardMaterial({map:texture,color:0xd5d9d9,roughness:0.65,metalness:0.28});
          var curtain=panel(shell,w-0.19,h,0.09,0,h,z,material);
          curtain.castShadow=true;
          curtain.visible=false;
          var bottomRail=panel(shell,w-0.15,0.085,0.16,0,h,z,steelMat);
          bottomRail.visible=false;
          return {curtain:curtain,bottomRail:bottomRail,texture:texture,clearance:h};
        }
        function wall(w,x,z,rotation){
          var group=new THREE.Group();
          group.position.set(x,0,z); group.rotation.y=rotation;
          var map=concrete.clone(); map.repeat.set(w/3.5,height/3.5); map.needsUpdate=true;
          var wallMaterial=new THREE.MeshStandardMaterial({map:map,color:0xaaa9a3,roughness:0.96,metalness:0,side:THREE.FrontSide});
          tintSurface(wallMaterial,0.68);
          var surface=new THREE.Mesh(new THREE.PlaneGeometry(w,height),wallMaterial);
          surface.position.y=height/2; surface.receiveShadow=true; group.add(surface);
          var lower=new THREE.Mesh(new THREE.PlaneGeometry(w,0.58),baseMat);
          lower.position.set(0,0.29,0.018); lower.receiveShadow=true; group.add(lower);
          var jointCount=Math.max(1,Math.round(w/3.45));
          for(var joint=1;joint<jointCount;joint++){
            var seam=new THREE.Mesh(new THREE.PlaneGeometry(0.018,height-0.68),seamMat);
            seam.position.set(-w/2+(w/jointCount)*joint,0.58+(height-0.68)/2,0.021);
            group.add(seam);
          }
          var cap=new THREE.Mesh(new THREE.PlaneGeometry(w,0.025),seamMat);
          cap.position.set(0,0.59,0.023); group.add(cap);
          shell.add(group);
        }
        // A continuous sky surrounds both outdoor yards. A flat backdrop showed
        // its edge as soon as the camera looked diagonally through either bay.
        var skyCanvas=document.createElement('canvas'); skyCanvas.width=8; skyCanvas.height=256;
        var skyContext=skyCanvas.getContext('2d');
        var skyFade=skyContext.createLinearGradient(0,0,0,256);
        skyFade.addColorStop(0,'#718493');
        skyFade.addColorStop(0.46,'#a2b2b9');
        skyFade.addColorStop(0.58,'#bdc5c3');
        skyFade.addColorStop(1,'#858d8d');
        skyContext.fillStyle=skyFade; skyContext.fillRect(0,0,8,256);
        var skyTexture=new THREE.CanvasTexture(skyCanvas); skyTexture.colorSpace=THREE.SRGBColorSpace;
        var skyDome=new THREE.Mesh(new THREE.SphereGeometry(70,32,16),new THREE.MeshBasicMaterial({map:skyTexture,side:THREE.BackSide,depthWrite:false,fog:false}));
        skyDome.renderOrder=-1; shell.add(skyDome);
        var midX=(bounds.min.x+bounds.max.x)/2, midZ=(bounds.min.z+bounds.max.z)/2;
        // Keep the service walls around the car, but leave a real drive-in bay
        // on the entrance side. Single-sided walls keep exterior camera views clear.
        wall(depth+0.4,bounds.min.x-0.12,midZ,Math.PI/2);
        wall(depth+0.4,bounds.max.x+0.12,midZ,-Math.PI/2);
        // Slim wall lights make each ceiling-light preset legible from the
        // normal car viewing height without recolouring the car paint.
        var garageAccentMat=new THREE.MeshBasicMaterial({color:0xffead0,toneMapped:false});
        var accentHeight=Math.min(2.45,height-0.7);
        panel(shell,0.035,0.055,depth-1.2,bounds.min.x+0.08,accentHeight,midZ,garageAccentMat);
        panel(shell,0.035,0.055,depth-1.2,bounds.max.x-0.08,accentHeight,midZ,garageAccentMat);
        var rearBayHalfWidth=Math.min(3.35,width*0.25);
        var rearBayCenter=0;
        var rearLeft=rearBayCenter-rearBayHalfWidth;
        var rearRight=rearBayCenter+rearBayHalfWidth;
        var rearZ=bounds.min.z-0.12;
        wall(rearLeft-bounds.min.x,(bounds.min.x+rearLeft)/2,rearZ,0);
        wall(bounds.max.x-rearRight,(rearRight+bounds.max.x)/2,rearZ,0);
        var rearClearance=Math.min(3.12,height-0.62);
        panel(shell,rearBayHalfWidth*2,height-rearClearance,0.16,rearBayCenter,rearClearance+(height-rearClearance)/2,rearZ,beamMat);
        [-1,1].forEach(function(side){
          panel(shell,0.095,rearClearance,0.18,rearBayCenter+side*rearBayHalfWidth,rearClearance/2,rearZ+0.055,steelMat);
        });
        for(var rearSlat=0;rearSlat<5;rearSlat++){
          panel(shell,rearBayHalfWidth*2-0.19,0.065,0.12,rearBayCenter,rearClearance+0.10+rearSlat*0.105,rearZ+0.14,cabinetMat);
        }
        var frontShutter=makeShutter(rearBayHalfWidth*2,rearClearance,rearZ+0.18);
        // Carry the paving well past the bay's side sightlines.
        var apronMap=concrete.clone(); apronMap.repeat.set(11.5,6.0); apronMap.needsUpdate=true;
        var apronMat=new THREE.MeshStandardMaterial({map:apronMap,color:0x858b89,roughness:0.98,metalness:0});
        var apron=new THREE.Mesh(new THREE.PlaneGeometry(42,22),apronMat);
        apron.rotation.x=-Math.PI/2;
        apron.position.set(rearBayCenter,0.008,rearZ-10.9);
        apron.receiveShadow=true; shell.add(apron);
        var laneMat=new THREE.MeshBasicMaterial({color:0xc0c2bc});
        for(var mark=0;mark<3;mark++){
          panel(shell,0.055,0.003,0.82,rearBayCenter-2.12,-0.001,bounds.min.z-1.65-mark*2.25,laneMat);
          panel(shell,0.055,0.003,0.82,rearBayCenter+2.12,-0.001,bounds.min.z-1.65-mark*2.25,laneMat);
        }
        var fenceZ=bounds.min.z-8.2;
        for(var post=-12;post<=12;post+=2){
          panel(shell,0.065,0.82,0.065,post,0.40,fenceZ,steelMat);
        }
        panel(shell,24.4,0.042,0.055,0,0.78,fenceZ,steelMat);
        panel(shell,24.4,0.034,0.055,0,0.38,fenceZ,steelMat);
        // The original service building remains, with its wings extending
        // beyond the widest view through the opening.
        var farZ=rearZ-14.3;
        var rearFacadeMap=concrete.clone(); rearFacadeMap.repeat.set(9,1.2); rearFacadeMap.needsUpdate=true;
        var rearFacadeMat=new THREE.MeshStandardMaterial({map:rearFacadeMap,color:0x777b78,roughness:0.97});
        panel(shell,36,3.05,0.24,0,1.525,farZ,rearFacadeMat);
        panel(shell,36.4,0.24,1.35,0,3.16,farZ+0.2,beamMat);
        [-1,1].forEach(function(side){
          panel(shell,0.22,2.45,14.4,side*12,1.225,rearZ-7.15,rearFacadeMat);
          panel(shell,0.32,0.12,14.4,side*12,2.49,rearZ-7.15,beamMat);
        });
        for(var exteriorBay=-3;exteriorBay<=3;exteriorBay++){
          var exteriorX=exteriorBay*4.5;
          panel(shell,2.85,1.7,0.035,exteriorX,1.03,farZ+0.14,steelMat);
          for(var rib=0;rib<7;rib++){
            panel(shell,2.7,0.018,0.045,exteriorX,0.36+rib*0.21,farZ+0.17,cabinetMat);
          }
          panel(shell,2.62,0.27,0.025,exteriorX,2.62,farZ+0.14,steelMat);
        }
        var bayHalfWidth=Math.min(3.15,width*0.24);
        var bayCenter=0;
        var entranceZ=bounds.max.z+0.12;
        var leftEnd=bayCenter-bayHalfWidth, rightStart=bayCenter+bayHalfWidth;
        wall(leftEnd-bounds.min.x, (bounds.min.x+leftEnd)/2,entranceZ,Math.PI);
        wall(bounds.max.x-rightStart,(rightStart+bounds.max.x)/2,entranceZ,Math.PI);
        var clearance=Math.min(3.12,height-0.62);
        panel(shell,bayHalfWidth*2,height-clearance,0.16,bayCenter,clearance+(height-clearance)/2,entranceZ,beamMat);
        // Exposed guides and a rolled-up shutter identify the opening as a garage bay.
        [-1,1].forEach(function(side){
          panel(shell,0.085,clearance,0.18,bayCenter+side*bayHalfWidth,clearance/2,entranceZ-0.055,steelMat);
          panel(shell,0.16,0.16,0.30,bayCenter+side*bayHalfWidth,clearance-0.04,entranceZ-0.12,steelMat);
        });
        for(var slat=0;slat<5;slat++){
          panel(shell,bayHalfWidth*2-0.19,0.065,0.12,bayCenter,clearance+0.10+slat*0.105,entranceZ-0.14,cabinetMat);
        }
        var rearShutter=makeShutter(bayHalfWidth*2,clearance,entranceZ-0.18);
        // Continue the opposite opening into a small outdoor service yard.
        // The original rear apron remains visible from the car's front view.
        var yardZ=entranceZ+10.9;
        var yardMap=concrete.clone(); yardMap.repeat.set(11.5,6.0); yardMap.needsUpdate=true;
        var yardFloor=new THREE.Mesh(new THREE.PlaneGeometry(42,22),new THREE.MeshStandardMaterial({map:yardMap,color:0xa3aaa8,roughness:0.98,metalness:0}));
        yardFloor.rotation.x=-Math.PI/2;
        yardFloor.position.set(bayCenter,0.01,yardZ);
        yardFloor.receiveShadow=true; shell.add(yardFloor);
        var curbMat=new THREE.MeshStandardMaterial({color:0x858c89,roughness:0.95});
        [-1,1].forEach(function(side){
          panel(shell,0.16,0.18,14.2,bayCenter+side*(bayHalfWidth+1.15),0.09,entranceZ+7.15,curbMat);
        });
        var yardMark=new THREE.MeshBasicMaterial({color:0xd1d2ca});
        for(var yardStripe=0;yardStripe<4;yardStripe++){
          panel(shell,0.055,0.003,0.82,bayCenter-1.55,0.014,entranceZ+1.65+yardStripe*2.25,yardMark);
          panel(shell,0.055,0.003,0.82,bayCenter+1.55,0.014,entranceZ+1.65+yardStripe*2.25,yardMark);
        }
        var yardBuildingZ=entranceZ+14.3;
        var yardWallMap=concrete.clone(); yardWallMap.repeat.set(9,1.2); yardWallMap.needsUpdate=true;
        var yardWallMat=new THREE.MeshStandardMaterial({map:yardWallMap,color:0x777e7d,roughness:0.96,metalness:0});
        panel(shell,36,2.85,0.26,bayCenter,1.425,yardBuildingZ,yardWallMat);
        panel(shell,36.4,0.22,0.72,bayCenter,2.96,yardBuildingZ-0.18,beamMat);
        [-1,1].forEach(function(side){
          panel(shell,0.22,2.45,14.4,bayCenter+side*12,1.225,entranceZ+7.15,yardWallMat);
          panel(shell,0.32,0.12,14.4,bayCenter+side*12,2.49,entranceZ+7.15,beamMat);
        });
        var yardDoorMat=new THREE.MeshStandardMaterial({color:0x404a4d,roughness:0.72,metalness:0.25});
        var yardWindowMat=new THREE.MeshBasicMaterial({color:0x8a9a9b});
        for(var yardBay=-3;yardBay<=3;yardBay++){
          var yardBayX=bayCenter+yardBay*4.5;
          panel(shell,2.85,1.85,0.035,yardBayX,1.0,yardBuildingZ-0.15,yardDoorMat);
          for(var yardRib=0;yardRib<8;yardRib++){
            panel(shell,2.71,0.018,0.018,yardBayX,0.20+yardRib*0.23,yardBuildingZ-0.178,cabinetMat);
          }
          panel(shell,2.7,0.34,0.026,yardBayX,2.25,yardBuildingZ-0.157,steelMat);
          panel(shell,2.48,0.22,0.008,yardBayX,2.25,yardBuildingZ-0.175,yardWindowMat);
        }
        // One deliberate work zone reads as a workshop without crowding the car.
        var workX=Math.min(bounds.max.x-2.2,rearRight+2.3);
        var workZ=bounds.min.z+0.42;
        var redSteel=new THREE.MeshStandardMaterial({color:0x9d2927,roughness:0.48,metalness:0.35});
        var redInset=new THREE.MeshStandardMaterial({color:0x812321,roughness:0.58,metalness:0.24});
        var brushedSteel=new THREE.MeshStandardMaterial({color:0xa4aaab,roughness:0.44,metalness:0.72});
        var rubber=new THREE.MeshStandardMaterial({color:0x1b2021,roughness:0.94,metalness:0});
        var worktop=new THREE.MeshStandardMaterial({color:0x777b79,roughness:0.68,metalness:0.28});
        panel(shell,3.34,0.075,0.72,workX,0.89,workZ+0.1,worktop);
        panel(shell,3.15,0.035,0.56,workX,0.82,workZ+0.07,rubber);
        [-1.47,1.47].forEach(function(offset){
          panel(shell,0.065,0.76,0.56,workX+offset,0.44,workZ+0.06,steelMat);
        });
        var boardZ=bounds.min.z+0.055;
        panel(shell,3.35,1.08,0.065,workX,1.67,boardZ,new THREE.MeshStandardMaterial({color:0x343a3b,roughness:0.83,metalness:0.12}));
        var pegDots=new THREE.InstancedMesh(new THREE.CircleGeometry(0.008,6),new THREE.MeshBasicMaterial({color:0x202526}),80);
        var pegMatrix=new THREE.Matrix4(), pegIndex=0;
        for(var holeRow=0;holeRow<5;holeRow++){
          for(var holeCol=0;holeCol<16;holeCol++){
            pegMatrix.makeTranslation(workX-1.5+holeCol*0.2,1.3+holeRow*0.17,boardZ+0.037);
            pegDots.setMatrixAt(pegIndex++,pegMatrix);
          }
        }
        pegDots.instanceMatrix.needsUpdate=true; shell.add(pegDots);
        // The tool chest has recessed drawers, metal pulls, a rubber top and casters.
        var chestX=workX-0.98, chestZ=workZ+0.16;
        panel(shell,1.12,0.77,0.53,chestX,0.47,chestZ,redSteel);
        panel(shell,1.15,0.055,0.57,chestX,0.89,chestZ,rubber);
        for(var drawer=0;drawer<5;drawer++){
          var drawerY=0.19+drawer*0.135;
          panel(shell,0.99,0.109,0.016,chestX,drawerY,chestZ+0.274,redInset);
          panel(shell,0.76,0.018,0.028,chestX,drawerY+0.024,chestZ+0.291,brushedSteel);
        }
        [-0.42,0.42].forEach(function(offset){
          var caster=new THREE.Mesh(new THREE.CylinderGeometry(0.065,0.065,0.052,12),rubber);
          caster.rotation.z=Math.PI/2;
          caster.position.set(chestX+offset,0.065,chestZ+0.15);
          shell.add(caster);
        });
        panel(shell,0.025,0.65,0.05,chestX+0.62,0.53,chestZ+0.1,brushedSteel);
        // An open shelf and a few recognisable tools replace the repeated T shapes.
        panel(shell,1.18,0.045,0.32,workX+0.95,1.18,boardZ+0.18,worktop);
        for(var can=0;can<3;can++){
          var bottle=new THREE.Mesh(new THREE.CylinderGeometry(0.052,0.052,0.18,10),can===1?redSteel:brushedSteel);
          bottle.position.set(workX+0.61+can*0.31,1.29,boardZ+0.17); shell.add(bottle);
        }
        for(var tool=0;tool<3;tool++){
          var toolX=workX-0.23+tool*0.31;
          panel(shell,0.025,0.30+(tool%2)*0.08,0.022,toolX,1.67,boardZ+0.055,brushedSteel);
          var wrenchHead=new THREE.Mesh(new THREE.TorusGeometry(0.048,0.013,6,10),brushedSteel);
          wrenchHead.position.set(toolX,1.84+(tool%2)*0.04,boardZ+0.065); shell.add(wrenchHead);
        }
        // Spare tyres stand on a low rack against the opposite wall.
        var rackX=bounds.min.x+0.62, rackZ=bounds.min.z+2.1;
        panel(shell,0.64,0.045,2.85,rackX,0.13,rackZ,steelMat);
        for(var tyre=0;tyre<3;tyre++){
          var tyreZ=rackZ-0.82+tyre*0.82;
          var spare=new THREE.Mesh(new THREE.TorusGeometry(0.34,0.115,10,28),rubber);
          spare.rotation.y=Math.PI/2;
          spare.position.set(rackX,0.58,tyreZ);
          spare.castShadow=true; shell.add(spare);
          var hub=new THREE.Mesh(new THREE.TorusGeometry(0.19,0.015,6,20),brushedSteel);
          hub.rotation.y=Math.PI/2;
          hub.position.set(rackX+0.12,0.58,tyreZ); shell.add(hub);
        }
        panel(shell,0.08,0.58,0.08,rackX,0.42,rackZ-1.35,steelMat);
        panel(shell,0.08,0.58,0.08,rackX,0.42,rackZ+1.35,steelMat);
        var hose=new THREE.Mesh(new THREE.TorusGeometry(0.26,0.026,8,32),new THREE.MeshStandardMaterial({color:0xb2935a,roughness:0.82}));
        hose.rotation.y=Math.PI/2;
        hose.position.set(bounds.min.x+0.12,1.72,rackZ+1.75); shell.add(hose);
        var extinguisher=new THREE.Mesh(new THREE.CylinderGeometry(0.10,0.10,0.44,12),redSteel);
        extinguisher.position.set(bounds.min.x+0.27,0.72,rackZ+2.15); shell.add(extinguisher);
        panel(shell,0.15,0.04,0.13,bounds.min.x+0.27,0.96,rackZ+2.15,steelMat);
        var signCanvas=document.createElement('canvas'); signCanvas.width=512; signCanvas.height=128;
        var signContext=signCanvas.getContext('2d');
        signContext.fillStyle='#2b3132'; signContext.fillRect(0,0,512,128);
        signContext.fillStyle='#a88961'; signContext.fillRect(18,18,6,92);
        signContext.fillStyle='#e8e5dc'; signContext.font='bold 46px Arial, sans-serif';
        signContext.fillText('SERVICE BAY',44,58);
        signContext.fillStyle='#b9b8b0'; signContext.font='28px Arial, sans-serif';
        signContext.fillText('01  /  WORKSHOP',46,96);
        var signTexture=new THREE.CanvasTexture(signCanvas); signTexture.colorSpace=THREE.SRGBColorSpace;
        var sign=new THREE.Mesh(new THREE.PlaneGeometry(3.3,0.825),new THREE.MeshBasicMaterial({map:signTexture,side:THREE.FrontSide}));
        sign.position.set(workX,2.82,bounds.min.z+0.005); shell.add(sign);
        var overhead=new THREE.Group(); shell.add(overhead);
        var ceilingMap=concrete.clone(); ceilingMap.repeat.set(width/3.5,depth/3.5); ceilingMap.needsUpdate=true;
        var ceilingMat=new THREE.MeshStandardMaterial({map:ceilingMap,color:0x82847f,roughness:0.96,metalness:0,side:THREE.DoubleSide});
        tintSurface(ceilingMat,0.62);
        panel(overhead,width+0.5,0.12,depth+0.5,midX,height+0.09,midZ,ceilingMat);
        for(var bx=bounds.min.x+2.6;bx<bounds.max.x-0.6;bx+=3.4){
          panel(overhead,0.27,0.26,depth+0.3,bx,height-0.06,midZ,beamMat);
        }
        for(var bz=bounds.min.z+2.6;bz<bounds.max.z-0.6;bz+=3.4){
          panel(overhead,width+0.3,0.22,0.27,midX,height-0.07,bz,beamMat);
        }
        var housingMat=new THREE.MeshStandardMaterial({color:0x33383a,roughness:0.8,metalness:0.2});
        var diffuserMat=new THREE.MeshStandardMaterial({color:0xece8dc,emissive:0xd1c9b5,emissiveIntensity:1.6,roughness:0.55,metalness:0});
        [-2.2,2.2].forEach(function(z){
          [-1.4,3.5,8.4].forEach(function(x){
            if(x<bounds.min.x+1||x>bounds.max.x-1)return;
            panel(overhead,1.85,0.085,0.19,x,height-0.16,z,housingMat);
            panel(overhead,1.65,0.018,0.12,x,height-0.21,z,diffuserMat);
          });
        });
        var garageRoomLights=[];
        [-1.4,3.5].forEach(function(x){
          var light=new THREE.PointLight(0xffead0,1.25,9,2);
          light.position.set(x,height-0.29,0);
          overhead.add(light);
          garageRoomLights.push(light);
        });
        panel(shell,1.42,0.045,0.14,workX+0.86,2.28,boardZ+0.3,housingMat);
        var taskDiffuser=panel(shell,1.25,0.012,0.07,workX+0.86,2.245,boardZ+0.34,diffuserMat);
        taskDiffuser.material=diffuserMat;
        var taskLight=new THREE.PointLight(0xffe7c4,0.45,3.2,2);
        taskLight.position.set(workX+0.86,2.12,boardZ+0.5); shell.add(taskLight);
        garageRoomLights.push(taskLight);
        shell.userData.overhead=overhead;
        shell.userData.overheadHeight=height;
        shell.userData.shutters={front:frontShutter,rear:rearShutter};
        shell.userData.garageRoomLights=garageRoomLights;
        shell.userData.garageDiffuser=diffuserMat;
        shell.userData.garageAccent=garageAccentMat;
        shell.userData.tintSurfaces=tintSurfaces;
        return shell;
      }
      function updateGarageShutter(which){
        if(!garageShellCache)return;
        var shutter=garageShellCache.userData.shutters[which];
        var raw=garageDoors[which].cur;
        var progress=raw*raw*(3-2*raw);
        shutter.curtain.visible=progress>0.002;
        shutter.bottomRail.visible=progress>0.002;
        shutter.curtain.scale.y=Math.max(progress,0.001);
        shutter.curtain.position.y=shutter.clearance*(1-progress/2);
        shutter.bottomRail.position.y=shutter.clearance*(1-progress)+0.045;
        shutter.texture.repeat.y=Math.max(0.01,18*progress);
        if(renderer)renderer.shadowMap.needsUpdate=true;
        needsRender=true;
      }
      function setGarageDoorsClosed(closed){
        garageDoors.front.target=closed?1:0;
        garageDoors.rear.target=closed?1:0;
        var button=document.getElementById('garage-door');
        button.setAttribute('aria-pressed',closed?'true':'false');
        button.textContent=closed?msg('Mở hai cửa','Open both doors'):msg('Đóng hai cửa','Close both doors');
      }
      function updateGarageLighting(){
        if(activeEnvironment!=='garage'||!garageShellCache||!garageLightCurrent)return;
        garageShellCache.userData.garageRoomLights.forEach(function(light){light.color.copy(garageLightCurrent);});
        garageShellCache.userData.garageDiffuser.emissive.copy(garageLightCurrent);
        garageShellCache.userData.garageAccent.color.copy(garageLightCurrent);
        garageShellCache.userData.tintSurfaces.forEach(function(surface){
          surface.material.color.copy(surface.base).lerp(garageLightCurrent,surface.strength);
        });
        keyLight.color.setHex(ENVIRONMENTS.garage.keyColor).lerp(garageLightCurrent,0.72);
        fillLight.color.setHex(ENVIRONMENTS.garage.fillColor).lerp(garageLightCurrent,0.7);
        rimLight.color.setHex(0xffffff).lerp(garageLightCurrent,0.55);
        ambientLight.color.setHex(0xffffff).lerp(garageLightCurrent,0.65);
        needsRender=true;
      }
      function setGarageLight(preset){
        if(!Object.prototype.hasOwnProperty.call(GARAGE_LIGHTS,preset))preset='warm';
        garageLightPreset=preset;
        garageLightButtons.forEach(function(button){button.setAttribute('aria-pressed',button.dataset.garageLight===preset?'true':'false');});
        garageLightTarget=new THREE.Color(GARAGE_LIGHTS[preset]);
        if(!garageLightCurrent)garageLightCurrent=garageLightTarget.clone();
        needsRender=true;
      }
      function prepareEnvironment(mode, root){
        if(root.userData.prepared) return root;
        root.traverse(function(node){
          if(node.isMesh){ node.receiveShadow=true; node.castShadow=false; }
        });
        if(mode==='station'){
          // The asphalt is a cylinder: its top face, rather than the bottom
          // of the whole diorama, is the wheel contact plane.
          root.scale.setScalar(0.35);
          root.rotation.y=Math.PI;
          root.updateMatrixWorld(true);
          var asphalt=root.getObjectByName('Object_4');
          var asphaltBox=new THREE.Box3().setFromObject(asphalt || root);
          root.position.set(-2,-asphaltBox.max.y,-2);
        } else {
          // The garage GLB is already in metres; align its floor with the car.
          var box=new THREE.Box3().setFromObject(root);
          root.position.set(0,-box.min.y,0);
          root.traverse(function(node){
            if(!node.isMesh)return;
            var materials=Array.isArray(node.material)?node.material:[node.material];
            var toned=materials.map(function(material){
              if(material.name!=='Mat.1')return material;
              var concreteMat=material.clone();
              // The source GLB gives its entire concrete mesh a metallic map,
              // which makes the garage floor look permanently wet.
              concreteMat.metalness=0;
              concreteMat.roughness=0.96;
              concreteMat.metalnessMap=null;
              concreteMat.roughnessMap=null;
              concreteMat.envMapIntensity=0.12;
              return concreteMat;
            });
            node.material=Array.isArray(node.material)?toned:toned[0];
          });
        }
        root.userData.prepared=true;
        return root;
      }
      function showEnvironment(mode, root){
        if(environmentRoot) scene.remove(environmentRoot);
        if(environmentShell){scene.remove(environmentShell);environmentShell=null;}
        environmentRoot=prepareEnvironment(mode,root);
        scene.add(environmentRoot);
        if(mode==='garage'){
          if(!garageShellCache)garageShellCache=makeGarageShell(environmentRoot);
          environmentShell=garageShellCache;
          scene.add(environmentShell);
          // The source mesh combines its floor with freestanding pillars. The
          // rebuilt shell supplies the floor and walls without blocking the car.
          environmentRoot.visible=false;
        }
        var spec=ENVIRONMENTS[mode];
        scene.background=new THREE.Color(spec.background);
        scene.fog.color.setHex(spec.background); scene.fog.near=28; scene.fog.far=85;
        scene.environment=defaultEnvironment.texture;
        groundMesh.visible=false; discMesh.visible=false; environmentFloor.visible=false;
        keyLight.intensity=spec.key; keyLight.color.setHex(spec.keyColor);
        fillLight.intensity=spec.fill; fillLight.color.setHex(spec.fillColor);
        rimLight.intensity=spec.rim; rimLight.color.setHex(0xffffff); ambientLight.intensity=spec.ambient;
        ambientLight.color.setHex(0xffffff);
        controls.maxDistance=mode==='garage'?6.2:16;
        controls.update();
        renderer.shadowMap.needsUpdate=true;
        activeEnvironment=mode;
        garageControls.hidden=mode!=='garage';
        if(mode==='garage'){
          updateGarageShutter('front'); updateGarageShutter('rear');
          setGarageLight(garageLightPreset);
          updateGarageLighting();
        }
        stage.dataset.environment=mode; stage.classList.remove('environment-loading');
        environmentStatus.textContent=''; needsRender=true;
        window.__bmwScene={environment:mode, floor:environmentRoot.position.y};
      }
      function restoreEmptyEnvironment(){
        if(environmentRoot){scene.remove(environmentRoot);environmentRoot=null;}
        if(environmentShell){scene.remove(environmentShell);environmentShell=null;}
        activeEnvironment='none';
        garageControls.hidden=true;
        scene.environment=defaultEnvironment.texture;
        scene.background=new THREE.Color(isDark()?0x101216:0xdfe3e7);
        scene.fog.color.setHex(isDark()?0x101216:0xdfe3e7); scene.fog.near=18; scene.fog.far=42;
        groundMesh.visible=true; discMesh.visible=true; environmentFloor.visible=false;
        keyLight.intensity=1.7; keyLight.color.setHex(0xffffff);
        fillLight.intensity=0.7; fillLight.color.setHex(0xdfe8ff);
        rimLight.intensity=1; rimLight.color.setHex(0xffffff); ambientLight.intensity=0.25;
        ambientLight.color.setHex(0xffffff);
        controls.maxDistance=16;
        renderer.toneMappingExposure=1;
        renderer.shadowMap.needsUpdate=true;
        stage.dataset.environment='none'; stage.classList.remove('environment-loading');
        environmentStatus.textContent='';
        window.__bmwScene={environment:'none'};
        needsRender=true;
      }
      function setEnvironment(mode){
        if(!scene) return;
        var request=++environmentRequest;
        if(mode==='none'){restoreEmptyEnvironment();return;}
        var spec=ENVIRONMENTS[mode];
        if(!spec){environmentSelect.value='none';restoreEmptyEnvironment();return;}
        if(activeEnvironment===mode){
          stage.classList.remove('environment-loading'); environmentStatus.textContent=''; return;
        }
        if(environmentModels[mode]){showEnvironment(mode,environmentModels[mode]);return;}
        stage.classList.add('environment-loading');
        environmentStatus.textContent=msg('Đang tải cảnh 3D…','Loading 3D scene…');
        var loader=new THREE.GLTFLoader();
        loader.load(new URL('environments/'+spec.file,modelUrl()).href,function(gltf){
          environmentModels[mode]=gltf.scene;
          if(request!==environmentRequest) return;
          try { showEnvironment(mode,gltf.scene); }
          catch(error){
            environmentSelect.value='none';restoreEmptyEnvironment();
            showErr(msg('Không mở được bối cảnh.','Could not open the environment.')+' '+error.message);
          }
        },undefined,function(){
          if(request!==environmentRequest)return;
          environmentSelect.value='none'; restoreEmptyEnvironment();
          showErr(msg('Không tải được bối cảnh.','Could not load the environment.'));
        });
      }
      environmentSelect.addEventListener('change',function(){ setEnvironment(this.value); });
      document.getElementById('garage-door').addEventListener('click',function(){
        setGarageDoorsClosed(garageDoors.front.target!==1);
      });
      garageLightButtons.forEach(function(button){
        button.addEventListener('click',function(){setGarageLight(this.dataset.garageLight);});
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

        pmremGenerator = new THREE.PMREMGenerator(renderer);
        defaultEnvironment = pmremGenerator.fromScene(new THREE.RoomEnvironment(), 0.04);
        scene.environment = defaultEnvironment.texture;

        var key = new THREE.DirectionalLight(0xffffff, 1.7); keyLight=key;
        key.position.set(6, 9, 4); key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.left=-7; key.shadow.camera.right=7; key.shadow.camera.top=7; key.shadow.camera.bottom=-7;
        scene.add(key);
        var fill = new THREE.DirectionalLight(0xdfe8ff, 0.7); fill.position.set(-7,4,-5); scene.add(fill); fillLight=fill;
        var rim = new THREE.DirectionalLight(0xffffff, 1.0); rim.position.set(-3,5,8); scene.add(rim); rimLight=rim;
        ambientLight = new THREE.AmbientLight(0xffffff, 0.25); scene.add(ambientLight);

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
        environmentFloor = new THREE.Mesh(new THREE.CircleGeometry(80, 64), new THREE.ShadowMaterial({color:0x000000, opacity:0.26}));
        environmentFloor.rotation.x = -Math.PI/2; environmentFloor.position.y = -0.003;
        environmentFloor.receiveShadow = true; environmentFloor.visible = false; scene.add(environmentFloor);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0.62, 0);
        controls.enableDamping = true; controls.dampingFactor = 0.06;
        controls.minDistance = 0.45; controls.maxDistance = 16;
        controls.maxPolarAngle = Math.PI * 0.52;
        controls.autoRotate = !reduceMotion && !softwareGL; controls.autoRotateSpeed = 0.7;
        defaultAutoRotate = controls.autoRotate;
        document.getElementById('spin').setAttribute('aria-pressed', controls.autoRotate ? 'true' : 'false');
        controls.addEventListener('change', function(){ needsRender = true; });
        controls.addEventListener('end', saveViewState);

        loadModel();
        resize();
        window.addEventListener('resize', resize);
        renderer.domElement.addEventListener('pointerdown', function(ev){
          controls.autoRotate=false; document.getElementById('spin').setAttribute('aria-pressed','false');
          stopTour();
          document.querySelectorAll('.viewbtn').forEach(function(b){ b.setAttribute('aria-pressed','false'); });
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
          try { setupOpeners(); setupMovable(); setupWheelSystem(); } catch(e){ showErr('Không dựng được cơ chế mở nắp / nổ tung: ' + (e && e.message ? e.message : e)); }
          if (!openerSets.length || !movable.size) showErr('Cơ chế mở cửa/ca-pô/cốp và nổ tung chưa sẵn sàng (openers=' + openerSets.length + ', movable=' + movable.size + ').');
          try { setupSpoiler(); } catch(e){ showErr('Không dựng được cánh gió ducktail: ' + (e && e.message ? e.message : e)); }
          try { setupBeams(); } catch(e){ }
          try { setupAeroStreams(); } catch(e){ }
          window.__bmwShowcase = { openers: openerSets.length, movable: movable.size, meshes: allMeshes.length };
          renderer.shadowMap.needsUpdate = true;
          needsRender = true;
          document.getElementById('loadveil').style.display='none';
          document.getElementById('environment').disabled = false;
          setPaint(0); setWheelFinish(0); setCaliperColor(0);
          restoreViewState();
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
            if (/^M4xNME_Black/.test(n) && /wheels_enkeif/.test(o.name||'')) wheelRimMats.push(m);
            if (/caliper/.test(n)) caliperMats.push(m);
            if (/GlassClear/.test(n)) glassMats.push(m);
            /* Đèn: không nhuộm M4xNME_Lights (chóa tối) và fogred — chỉ sáng DRL vàng & thấu kính bi cầu */
            if (m.emissive){
              if (/runningY|highbeam/.test(n)){
                m.userData._e0 = m.emissive.getHex(); m.userData._ei0 = m.emissiveIntensity;
                frontLightMats.push(m);
              } else if (/taillight|LS8|lowhighbeam/.test(n) || (/brake/.test(n) && n.indexOf('amdb11')!==0)){
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
            if (!pid) pid = matchPart(node.name||'') || (extraByName[node.name] && extraByName[node.name].part);
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
        // The GLB stores many mesh vertices away from each group's origin.
        // Use the visible geometry centre, so left and right assemblies
        // actually separate to their own side of the vehicle.
        carRoot.updateMatrixWorld(true);
        PARTS.forEach(function(p){
          (partObjects[p.id]||[]).forEach(function(o){
            var center = new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3());
            var side = center.x < -0.12 ? -1 : center.x > 0.12 ? 1 : 0;
            var frontRear = center.z >= 0 ? 1 : -1;
            var dir = new THREE.Vector3(p.explode[0], p.explode[1], p.explode[2]);
            if (p.id === 'wheel') dir.set(side * 0.82, 0.06, 0);
            else if (p.id === 'brake') dir.set(side * 1.16, 0.12, 0);
            else if (p.id === 'headlight') dir.set(side * 0.26, 0.16, 0.57);
            else if (p.id === 'taillight') dir.set(side * 0.3, 0.17, -0.62);
            else if (p.id === 'mirror') dir.set(side * 0.48, 0.28, 0);
            else if (p.id === 'seat') dir.set(side * 0.22, 0.88, -0.08);
            else if (p.id === 'suspension') dir.set(side ? side * 0.58 : -0.68, 0.24, frontRear * 0.12);
            else if (p.id === 'diff') dir.set(-1.12, 0.27, frontRear * 0.35);
            else if (p.id === 'gearbox') dir.set(1.12, 0.32, center.z > 0.4 ? 0.12 : -0.08);
            else if (p.id === 'exhaust') dir.set(0.78, 0.25, -0.3);
            else if (p.id === 'grille') {
              dir.set(0, /splitter/.test(o.name) ? -0.12 : 0.08, /grille/.test(o.name) ? 0.88 : /splitter/.test(o.name) ? 1.05 : 0.6);
            }
            else if (p.id === 'cockpit') dir.set(side * 0.18, /steer|dash/.test(o.name) ? 0.77 : 0.58, 0.02);
            o.userData.explodeDir = dir;
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
      var trunkGlass = null;
      var explodeCur = 0, explodeTarget = 0;
      function findNode(name){
        var f = null;
        carRoot.traverse(function(o){ if (o.name === name && !f) f = o; });
        return f;
      }
      function setupOpeners(){
        openerSets = []; setByWhich = {};
        trunkGlass = findNode('M4xNME_taillightglass_R_custom');
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
        regSafe('doors', ['M4xNME_door_FL','M4xNME_doorpanel_FL','M4xNME_doorglass_FL','M4xNME_mirror_L'], new THREE.Vector3(0,1,0), -1.02,
            new THREE.Vector3(cl.x, cl.y, bl.max.z - 0.03));
        var br = boxOf('M4xNME_door_FR'), cr = br.getCenter(new THREE.Vector3());
        regSafe('doors', ['M4xNME_door_FR','M4xNME_doorpanel_FR','M4xNME_doorglass_FR','M4xNME_mirror_R'], new THREE.Vector3(0,1,0), 1.02,
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
        regSafe('trunk', ['M4xNME_trunk_csl','M4xNME_tailgatelight_csl','M4xNME_tailgateframe','M4xNME_trunkint'], new THREE.Vector3(1,0,0), 0.60,
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
          // All display floors sit at world Y=0. Keep the lowest vertex of
          // every separated group above them throughout the animation.
          var bounds = new THREE.Box3().setFromObject(o);
          var safeDir = worldDir.clone();
          safeDir.y = Math.max(safeDir.y, (0.12 - bounds.min.y) / 1.5);
          var pq = new THREE.Quaternion(); o.parent.getWorldQuaternion(pq);
          var ps = new THREE.Vector3(); o.parent.getWorldScale(ps);
          var v = safeDir.multiplyScalar(1.5).applyQuaternion(pq.invert());
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
              var center = new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3());
              var side = center.x >= 0 ? 1 : -1;
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
        // Inner door trim belongs to the moving door even though its name
        // does not match the public "Doors / body" handbook category.
        (setByWhich.doors || []).forEach(function(s){
          s.objs.forEach(function(o){
            if (!/doorpanel/.test(o.name) || movable.has(o)) return;
            var center = new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3());
            movable.set(o, {base:o.position.clone(), off:toLocalOffset(o,new THREE.Vector3(center.x >= 0 ? 0.85 : -0.85,0.05,0))});
          });
        });
        EXTRA_GROUPS.forEach(function(group){
          var o = findNode(group.name);
          if (o && o.parent && !movable.has(o)) {
            movable.set(o, {base:o.position.clone(), off:toLocalOffset(o,new THREE.Vector3(group.dir[0],group.dir[1],group.dir[2]))});
          }
        });
      }
      function setupWheelSystem(){
        wheelCorners = [];
        steerWheelObjs = [];
        carRoot.updateMatrixWorld(true);
        var flNodes = [], frNodes = [], seen = new Set();
        (partObjects.wheel || []).concat(partObjects.brake || []).forEach(function(o){
          if (!o || !o.parent || seen.has(o)) return;
          seen.add(o);
          var c = new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3());
          if (c.z <= 0.5) return;
          if (c.x >= 0) flNodes.push(o);
          else frNodes.push(o);
        });
        [flNodes, frNodes].forEach(function(group){
          if (!group.length) return;
          var combinedBox = new THREE.Box3(), hasWheel = false;
          group.forEach(function(o){
            if (/wheels_enkeif|^Object_4/i.test(o.name || '')){
              combinedBox.union(new THREE.Box3().setFromObject(o));
              hasWheel = true;
            }
          });
          if (!hasWheel) group.forEach(function(o){ combinedBox.union(new THREE.Box3().setFromObject(o)); });
          var pivotWorld = combinedBox.getCenter(new THREE.Vector3());
          var nodes = group.map(function(o){
            var pq = new THREE.Quaternion(); o.parent.getWorldQuaternion(pq);
            return {
              obj: o,
              basePos: o.position.clone(),
              baseQuat: o.quaternion.clone(),
              pivotLocal: o.parent.worldToLocal(pivotWorld.clone()),
              steerAxisLocal: new THREE.Vector3(0, 1, 0).applyQuaternion(pq.clone().invert()).normalize()
            };
          });
          wheelCorners.push({nodes: nodes});
        });
        carRoot.traverse(function(o){
          if (o.name && /^M4xNME_steer_stitch(?:_|\.|$|\d)/.test(o.name) && o.children && o.children.length){
            if (!/^M4xNME_steer_stitch.*_M4xNME_/.test(o.name)){
              steerWheelObjs.push({obj: o, baseQuat: o.quaternion.clone()});
            }
          }
        });
      }

      /* Nơi DUY NHẤT ghi position/quaternion cho cụm di chuyển được:
         quay quanh bản lề trước, rồi cộng độ tách theo hướng cố định.
         Nhờ vậy mở nắp và nổ tung cộng dồn đúng, không ghi đè nhau —
         gốc lỗi "nổ tung không ăn" của bản cũ là hai cơ chế cùng ghi
         position theo hai hệ basePos khác nhau. */
      function layoutAll(){
        var q = new THREE.Quaternion(), tmp = new THREE.Vector3();
        var setOf = new Map();
        openerSets.forEach(function(s){ s.objs.forEach(function(o){ setOf.set(o, s); }); });
        var wheelNodeSet = new Set();
        wheelCorners.forEach(function(c){ c.nodes.forEach(function(n){ wheelNodeSet.add(n.obj); }); });
        movable.forEach(function(rec, o){
          if (wheelNodeSet.has(o)) return;
          tmp.copy(rec.base);
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
          // Apply separation after hinge rotation. Otherwise opening a door,
          // hood or trunk rotates its exploded offset around the old hinge.
          tmp.addScaledVector(rec.off, explodeCur);
          o.position.copy(tmp);
        });
        var qSteer = new THREE.Quaternion();
        wheelCorners.forEach(function(c){
          c.nodes.forEach(function(n){
            tmp.copy(n.basePos);
            if (steerCur !== 0){
              qSteer.setFromAxisAngle(n.steerAxisLocal, steerCur);
              tmp.sub(n.pivotLocal).applyQuaternion(qSteer).add(n.pivotLocal);
              n.obj.quaternion.copy(qSteer).multiply(n.baseQuat);
            } else {
              n.obj.quaternion.copy(n.baseQuat);
            }
            var rec = movable.get(n.obj);
            if (rec) tmp.addScaledVector(rec.off, explodeCur);
            n.obj.position.copy(tmp);
          });
        });
        var qSW = new THREE.Quaternion();
        qSW.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -steerCur * 4.5);
        steerWheelObjs.forEach(function(sw){
          sw.obj.quaternion.copy(sw.baseQuat).multiply(qSW);
        });
        // Tấm kính đèn hậu trong GLB là một mesh liền ngang cả hai bên.
        // Khi mở cốp, phần giữa mesh này sẽ lơ lửng trong miệng cốp;
        // giữ các cụm đèn hai bên và ẩn riêng tấm kính không chia được.
        if (trunkGlass && setByWhich.trunk) trunkGlass.visible = setByWhich.trunk.cur <= 0.01;
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

      function makeBeamConeTexture(){
        var c = document.createElement('canvas'); c.width = 64; c.height = 256;
        var ctx = c.getContext('2d');
        var g = ctx.createLinearGradient(0, 0, 0, 256);
        g.addColorStop(0.0, 'rgba(255, 248, 228, 0.28)');
        g.addColorStop(0.25, 'rgba(255, 245, 218, 0.12)');
        g.addColorStop(0.65, 'rgba(255, 242, 206, 0.03)');
        g.addColorStop(1.0, 'rgba(255, 242, 206, 0.0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 256);
        var tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
      }

      /* Chùm sáng thật khi bật đèn: 2 spotlight + 4 nón sáng từ 4 bi cầu chiếu về
         phía trước (+Z) và 1 point light đỏ ở đuôi. */
      function setupBeams(){
        beamCones = [];
        var sideCenters = [], projectorOrigins = [];
        carRoot.updateMatrixWorld(true);
        allMeshes.forEach(function(m){
          var nm = m.name || '';
          if (!/headlight_[LR].*highbeam/i.test(nm) || !m.geometry || !m.geometry.attributes.position) return;
          var fullBox = new THREE.Box3().setFromObject(m);
          var fullCenter = fullBox.getCenter(new THREE.Vector3());
          sideCenters.push(fullCenter);
          var b1 = new THREE.Box3(), b2 = new THREE.Box3();
          var pos = m.geometry.attributes.position, v = new THREE.Vector3();
          for (var i = 0; i < pos.count; i++){
            v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
            if (v.x < fullCenter.x) b1.expandByPoint(v);
            else b2.expandByPoint(v);
          }
          if (!b1.isEmpty()) projectorOrigins.push(b1.getCenter(new THREE.Vector3()));
          if (!b2.isEmpty()) projectorOrigins.push(b2.getCenter(new THREE.Vector3()));
        });
        if (!sideCenters.length){
          var hc = partCenter('headlight');
          if (hc){
            sideCenters.push(new THREE.Vector3(hc.center.x + 0.62, hc.center.y, hc.center.z + 0.05));
            sideCenters.push(new THREE.Vector3(hc.center.x - 0.62, hc.center.y, hc.center.z + 0.05));
          }
        }
        if (!projectorOrigins.length){
          sideCenters.forEach(function(c){
            projectorOrigins.push(new THREE.Vector3(c.x - 0.06, c.y, c.z));
            projectorOrigins.push(new THREE.Vector3(c.x + 0.06, c.y, c.z));
          });
        }
        sideCenters.forEach(function(orig, idx){
          var sp = new THREE.SpotLight(0xfff1d4, 145, 24, 0.38, 0.72, 1.35);
          sp.position.set(orig.x, orig.y, orig.z + 0.04);
          sp.target.position.set(orig.x, 0.05, orig.z + 10);
          sp.visible = false; scene.add(sp); scene.add(sp.target);
          if (idx === 0) beamL = sp; else if (idx === 1) beamR = sp;
        });
        if (projectorOrigins.length){
          var coneTex = makeBeamConeTexture();
          var coneGeo = new THREE.CylinderGeometry(0.032, 0.22, 3.2, 20, 1, true);
          coneGeo.translate(0, -1.6, 0);
          coneGeo.rotateX(-Math.PI / 2);
          var coneMat = new THREE.MeshBasicMaterial({
            map: coneTex, transparent: true, blending: THREE.AdditiveBlending,
            depthWrite: false, side: THREE.FrontSide
          });
          projectorOrigins.forEach(function(orig){
            var cone = new THREE.Mesh(coneGeo, coneMat);
            cone.position.set(orig.x, orig.y, orig.z + 0.02);
            cone.rotation.x = 0.08;
            cone.visible = false;
            scene.add(cone);
            beamCones.push(cone);
          });
        }
        var tc = partCenter('taillight');
        if (tc){
          tailGlow = new THREE.PointLight(0xff2a22, 4.5, 4.5, 1.6);
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

      function setupAeroStreams(){
        aeroGroup = new THREE.Group();
        aeroGroup.visible = false;
        var curves = [
          [0, 0.36, 3.0,  0, 0.62, 2.25,  0, 0.96, 1.35,  0, 1.40, 0.35,  0, 1.38, -0.75,  0, 1.08, -1.95,  0, 1.24, -2.55,  0, 1.32, -3.25],
          [-0.58, 0.34, 2.95, -0.62, 0.60, 2.2, -0.60, 0.92, 1.3, -0.52, 1.33, 0.2, -0.55, 1.25, -0.9, -0.60, 1.02, -2.05, -0.62, 1.18, -2.9],
          [ 0.58, 0.34, 2.95,  0.62, 0.60, 2.2,  0.60, 0.92, 1.3,  0.52, 1.33, 0.2,  0.55, 1.25, -0.9,  0.60, 1.02, -2.05,  0.62, 1.18, -2.9],
          [-0.36, 0.16, 2.7, -0.36, 0.14, 0.8, -0.36, 0.14, -1.2, -0.38, 0.28, -2.4, -0.40, 0.44, -3.2],
          [ 0.36, 0.16, 2.7,  0.36, 0.14, 0.8,  0.36, 0.14, -1.2,  0.38, 0.28, -2.4,  0.40, 0.44, -3.2]
        ];
        curves.forEach(function(coords, idx){
          var pts = [];
          for (var i = 0; i < coords.length; i += 3) pts.push(new THREE.Vector3(coords[i], coords[i+1], coords[i+2]));
          var curve = new THREE.CatmullRomCurve3(pts);
          var tube = new THREE.Mesh(
            new THREE.TubeGeometry(curve, 64, 0.014, 6, false),
            new THREE.MeshBasicMaterial({color: idx >= 3 ? 0xe0203a : 0x0088ff, transparent: true, opacity: 0.48, depthWrite: false})
          );
          aeroGroup.add(tube);
          for (var k = 0; k < 6; k++){
            var particle = new THREE.Mesh(
              new THREE.SphereGeometry(0.030, 8, 8),
              new THREE.MeshBasicMaterial({color: idx >= 3 ? 0xff4d60 : 0x38b6ff, toneMapped: false})
            );
            aeroGroup.add(particle);
            aeroStreams.push({curve: curve, mesh: particle, t: k / 6, speed: idx >= 3 ? 0.58 : 0.46});
          }
        });
        scene.add(aeroGroup);
      }

      /* Áp trạng thái đèn lên vật liệu: DRL vàng + 4 bi cầu pha,
         đèn hậu sáng đỏ, tắt thì khôi phục emissive gốc của model. */
      function applyLights(){
        frontLightMats.forEach(function(m){
          if (m.userData._hl) return;
          if (lightsOn){
            var isDrl = /runningY/.test(m.name||'');
            m.emissive.setHex(isDrl ? 0xffc21f : 0xfff5de);
            m.emissiveIntensity = isDrl ? 1.25 : 1.55;
          } else {
            m.emissive.setHex(m.userData._e0 || 0);
            m.emissiveIntensity = (m.userData._ei0 != null ? m.userData._ei0 : 1);
          }
        });
        rearLightMats.forEach(function(m){
          if (m.userData._hl) return;
          if (lightsOn){ m.emissive.setHex(0xff2020); m.emissiveIntensity = 1.15; }
          else { m.emissive.setHex(m.userData._e0 || 0); m.emissiveIntensity = (m.userData._ei0 != null ? m.userData._ei0 : 1); }
        });
        if (beamL) beamL.visible = lightsOn;
        if (beamR) beamR.visible = lightsOn;
        beamCones.forEach(function(c){ c.visible = lightsOn; });
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
      function clearSelection(){
        if (!selected) return;
        selected = null;
        fly = null;
        clearHighlight();
        selectionReveal = false;
        if (selectionAutoXray){
          xray = false; selectionAutoXray = false;
          document.getElementById('xray').setAttribute('aria-pressed','false');
        }
        if (selectionOpenedHood){
          setOpen('hood', false); selectionOpenedHood = false;
        }
        Object.keys(btnById).forEach(function(k){ btnById[k].setAttribute('aria-pressed','false'); });
        document.getElementById('selbar').hidden = true;
        document.getElementById('d-sys').textContent = msg('Chưa chọn bộ phận','No part selected');
        document.getElementById('d-name').textContent = msg('Bấm vào một bộ phận trên xe','Select a part of the car');
        document.getElementById('d-desc').textContent = msg('Chọn một bộ phận trên xe để xem chức năng, vật liệu và thông số.','Select a part of the car to see its function, materials and specifications.');
        document.getElementById('d-dl').hidden = true;
        applyXrayVisuals();
        needsRender = true;
      }
      document.getElementById('sb-clear').addEventListener('click', clearSelection);
      document.addEventListener('keydown', function(ev){ if(ev.key === 'Escape' && selected) clearSelection(); });
      function partCenter(pid){
        var box = new THREE.Box3(), found=false;
        allMeshes.forEach(function(m){ if(m.userData.partId===pid){ box.union(new THREE.Box3().setFromObject(m)); found=true; } });
        if (!found) return null;
        return {center: box.getCenter(new THREE.Vector3()), size: box.getSize(new THREE.Vector3())};
      }
      function selectPart(id, flyCam){
        var p = PARTS.filter(function(x){return x.id===id;})[0]; if(!p) return;
        if (selected === id) { clearSelection(); return; }
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
        setSelectionViewState(id);
        applyXrayVisuals();
        if (flyCam) flyToPart(id);
        // Không tự cuộn xuống bảng chi tiết: xe vẫn ở trong tầm nhìn.
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
        clearSelection();
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

      var wheelSwEl = document.getElementById('wheel-swatches');
      WHEEL_FINISHES.forEach(function(w, i){
        var b = document.createElement('button'); b.className='sw sm';
        var hexStr = '#'+w.hex.toString(16).padStart(6,'0').toUpperCase();
        b.style.background = hexStr;
        var label = english ? w.en : w.name;
        b.title = msg('Mâm: ','Wheels: ')+label+' ('+hexStr+')';
        b.setAttribute('aria-label', msg('Mâm: ','Wheels: ')+label);
        b.setAttribute('aria-pressed', i===0?'true':'false');
        b.addEventListener('click', function(){ setWheelFinish(i); });
        wheelSwEl.appendChild(b);
      });
      function setWheelFinish(i){
        var w = WHEEL_FINISHES[i];
        wheelRimMats.forEach(function(m){
          if (m.color) m.color.setHex(w.hex);
          m.roughness = w.rough; m.metalness = w.metal;
          if ('envMapIntensity' in m) m.envMapIntensity = 0.85;
          m.needsUpdate = true;
        });
        document.getElementById('wheelname').textContent = english ? w.en : w.name;
        Array.prototype.forEach.call(wheelSwEl.children, function(b, j){ b.setAttribute('aria-pressed', j===i?'true':'false'); });
        needsRender = true;
      }

      var calSwEl = document.getElementById('caliper-swatches');
      CALIPER_COLORS.forEach(function(c, i){
        var b = document.createElement('button'); b.className='sw sm';
        var hexStr = '#'+c.hex.toString(16).padStart(6,'0').toUpperCase();
        b.style.background = hexStr;
        var label = english ? c.en : c.name;
        b.title = msg('Kẹp phanh: ','Calipers: ')+label+' ('+hexStr+')';
        b.setAttribute('aria-label', msg('Kẹp phanh: ','Calipers: ')+label);
        b.setAttribute('aria-pressed', i===0?'true':'false');
        b.addEventListener('click', function(){ setCaliperColor(i); });
        calSwEl.appendChild(b);
      });
      function setCaliperColor(i){
        var c = CALIPER_COLORS[i];
        caliperMats.forEach(function(m){
          if (m.color) m.color.setHex(c.hex);
          m.roughness = c.rough; m.metalness = c.metal; m.needsUpdate = true;
        });
        document.getElementById('calipername').textContent = english ? c.en : c.name;
        Array.prototype.forEach.call(calSwEl.children, function(b, j){ b.setAttribute('aria-pressed', j===i?'true':'false'); });
        needsRender = true;
      }

      /* Góc nhìn — theo trục thật của model: đầu xe +Z, đuôi −Z, hông ±X.
         Bản cũ đặt "Hông" ở +Z (ra hình đầu xe) và "Đầu xe" ở +X (ra hình
         hông xe) — hai nút hoán đổi cho nhau; "Khoang máy" lại nhắm vào
         x=1,15 (trúng cánh cửa) trong khi động cơ nằm giữa xe, z≈+1,3–1,5. */
      var VIEWS = {
        hero:  {p:[4.55,1.75,5.35], t:[0,0.62,0]},
        side:  {p:[8.4,1.2,0],    t:[0,0.68,0]},
        rear:  {p:[0,1.35,-5.8],  t:[0,0.7,0]},
        front: {p:[0,1.3,5.8],    t:[0,0.65,0]},
        top:   {p:[0.7,11.7,0.7], t:[0,0.62,0]},
        engine:{p:[1.9,3.5,3.55], t:[0,0.8,1.5]},
        cockpit:{p:[0.42,1.15,-0.32], t:[0.38,0.92,0.72]}
      };
      // Tọa độ xe sau chuẩn hóa: đầu +Z, đuôi -Z, bên trái +X.
      // Mỗi mục Sổ tay có một hướng riêng; các cụm lặp lại ở hai bên
      // ưu tiên phía +X để nút không nhắm vào khoảng giữa xe.
      var PART_VIEWS = {
        grille:     {p:[1.4,1.35,4.7], t:[0,0.55,2.1]},
        headlight:  {p:[2.6,1.65,4.3], t:[0.65,0.83,2.0]},
        hood:       {p:[1.7,3.0,3.8], t:[0,0.93,1.5]},
        roof:       {p:[2.3,3.4,1.5], t:[0,1.35,0]},
        mirror:     {p:[3.6,1.8,2.3], t:[0.95,1.05,0.8]},
        door:       {p:[5.6,1.6,0.8], t:[0.75,0.8,0]},
        trunk:      {p:[1.5,2.2,-4.3], t:[0,0.9,-1.9]},
        taillight:  {p:[1.4,1.4,-4.3], t:[0,0.85,-2.0]},
        diffuser:   {p:[1.2,0.85,-4.4], t:[0,0.35,-2.15]},
        engine:     VIEWS.engine,
        strutbrace: {p:[1.9,3.2,3.4], t:[0,1.0,1.3]},
        cooling:    {p:[1.5,2.4,4.1], t:[0,0.65,2.0]},
        gearbox:    {p:[3.4,1.9,1.2], t:[0,0.4,0.2]},
        diff:       {p:[3.4,1.7,-2.1], t:[0,0.4,-1.35]},
        exhaust:    {p:[2.9,1.5,-3.6], t:[0,0.32,-1.8]},
        wheel:      {p:[3.4,1.1,2.0], t:[0.9,0.4,1.35]},
        brake:      {p:[3.2,1.3,2.0], t:[0.95,0.43,1.35]},
        suspension: {p:[3.3,1.7,1.8], t:[0.9,0.55,1.3]},
        seat:       {p:[2.9,2.4,0.9], t:[0.5,0.9,0.1]},
        cockpit:    {p:[2.7,2.6,2.0], t:[0.3,1.0,0.75]}
      };
      var REVEAL_PARTS = {cooling:1, gearbox:1, diff:1, exhaust:1, brake:1, suspension:1, seat:1, cockpit:1};
      var HOOD_PARTS = {engine:1, strutbrace:1, cooling:1};
      var pendingExplodedFocus = null;
      function setSelectionViewState(id){
        var reveal = !!REVEAL_PARTS[id], openHood = !!HOOD_PARTS[id];
        if (selectionAutoXray && !reveal){ xray = false; selectionAutoXray = false; }
        selectionReveal = reveal;
        if (reveal && !xray){ xray = true; selectionAutoXray = true; }
        document.getElementById('xray').setAttribute('aria-pressed', xray ? 'true' : 'false');
        if (selectionOpenedHood && !openHood){ setOpen('hood', false); selectionOpenedHood = false; }
        if (openHood && !hoodOpen){ setOpen('hood', true); selectionOpenedHood = true; }
      }
      function flyToCamera(v){
        if (!v) return;
        controls.autoRotate = false;
        document.getElementById('spin').setAttribute('aria-pressed','false');
        fly = {t:0, fromP:camera.position.clone(), toP:new THREE.Vector3(v.p[0],v.p[1],v.p[2]), fromT:controls.target.clone(), toT:new THREE.Vector3(v.t[0],v.t[1],v.t[2])};
      }
      function flyToView(name){
        if (name === 'engine') setOpen('hood', true);
        if (name === 'cockpit') setOpen('doors', true);
        flyToCamera(VIEWS[name]);
      }
      function explodedPartView(id){
        var box = new THREE.Box3(), found = false;
        (partObjects[id] || []).forEach(function(o){
          if (movable.has(o)) { box.union(new THREE.Box3().setFromObject(o)); found = true; }
        });
        EXTRA_GROUPS.forEach(function(group){
          if (group.part !== id) return;
          var o = findNode(group.name);
          if (o && movable.has(o)) { box.union(new THREE.Box3().setFromObject(o)); found = true; }
        });
        var part = found ? {center:box.getCenter(new THREE.Vector3()),size:box.getSize(new THREE.Vector3())} : partCenter(id);
        if (!part) return PART_VIEWS[id];
        var target = part.center.clone();
        target.y = Math.max(0.35, target.y);
        var distance = Math.max(3.1, Math.min(5.1, part.size.length() * 1.25 + 1.5));
        if (camera.aspect < 1) distance *= 1.2;
        var side = id === 'diff' || id === 'suspension' ? -1 : 1;
        var position = target.clone().add(new THREE.Vector3(side * distance * 0.82, distance * 0.53, distance * (id === 'exhaust' || id === 'diff' ? -0.3 : 0.34)));
        return {p:position.toArray(), t:target.toArray()};
      }
      function clearSceneSightline(view){
        if (activeEnvironment !== 'station' || !environmentRoot || !view) return view;
        var target = new THREE.Vector3().fromArray(view.t);
        var original = new THREE.Vector3().fromArray(view.p);
        var offset = original.clone().sub(target);
        var radius = Math.hypot(offset.x, offset.z);
        var angle = Math.atan2(offset.x, offset.z);
        var ray = new THREE.Raycaster();
        var best = view, fewest = Infinity;
        [0,-Math.PI/6,Math.PI/6,-Math.PI/3,Math.PI/3].forEach(function(turn){
          var candidate = target.clone().add(new THREE.Vector3(
            Math.sin(angle + turn) * radius, offset.y, Math.cos(angle + turn) * radius
          ));
          var direction = target.clone().sub(candidate);
          ray.set(candidate, direction.clone().normalize());
          ray.far = Math.max(0, direction.length() - 0.3);
          var hits = ray.intersectObjects(environmentRoot.children, true).filter(function(hit){
            return hit.object.visible && hit.object.name !== 'Object_4';
          });
          if (hits.length < fewest){
            fewest = hits.length;
            best = {p:candidate.toArray(),t:view.t};
          }
        });
        return best;
      }
      function flyToPart(id){
        document.querySelectorAll('.viewbtn').forEach(function(b){ b.setAttribute('aria-pressed','false'); });
        if (explodeTarget > 0.05){
          if (Math.abs(explodeCur - explodeTarget) > 0.01){ pendingExplodedFocus = id; return; }
          pendingExplodedFocus = null;
          flyToCamera(clearSceneSightline(explodedPartView(id)));
        } else {
          pendingExplodedFocus = null;
          flyToCamera(clearSceneSightline(PART_VIEWS[id]));
        }
      }
      document.querySelectorAll('.viewbtn').forEach(function(b){
        b.addEventListener('click', function(){
          stopTour();
          if (selected) clearSelection();
          document.querySelectorAll('.viewbtn').forEach(function(x){x.setAttribute('aria-pressed','false');});
          b.setAttribute('aria-pressed','true');
          flyToView(b.dataset.view);
        });
      });

      /* Toggle */
      /* X-ray: làm mờ TOÀN BỘ vỏ ngoài (mọi mesh không thuộc hệ cơ khí /
         nội thất) thay vì chỉ vật liệu tên *Paint như bản cũ — ca-pô và
         trần carbon, viền nhựa đen… trước đây vẫn đặc nên "xuyên" lỗ chỗ.
         Trạng thái gốc của từng vật liệu được lưu và khôi phục đúng y
         nguyên khi tắt (bản cũ ép kính về opacity 0,45 bất kể gốc). */
      var XRAY_KEEP = {engine:1, strutbrace:1, cooling:1, gearbox:1, diff:1, exhaust:1, suspension:1, brake:1, wheel:1, seat:1, cockpit:1};
      function applyXrayVisuals(){
        var anyGhost = xray || cslWeightMode;
        allMeshes.forEach(function(m){
          var pid=m.userData.partId;
          var selectedMesh=selected && pid===selected && !(selected==='engine' && m.userData.bay);
          var isCslWeight=cslWeightMode && !!CSL_WEIGHT_IDS[pid];
          var ghost=false;
          if (cslWeightMode){
            ghost=!isCslWeight && !selectedMesh;
          } else if (xray){
            ghost=!selectedMesh && (selectionReveal || !XRAY_KEEP[pid] || m.userData.bay);
          }
          var mats=Array.isArray(m.material)?m.material:[m.material];
          mats.forEach(function(mm){
            if (anyGhost && !mm.userData._xr) mm.userData._xr={t:mm.transparent,o:mm.opacity,d:mm.depthWrite};
            var original=mm.userData._xr;
            if (!anyGhost){
              if (original){
                mm.transparent=original.t; mm.opacity=original.o; mm.depthWrite=original.d;
                delete mm.userData._xr; mm.needsUpdate=true;
              }
              if (mm.userData._csl){
                mm.emissive && mm.emissive.setHex(mm.userData._ce || 0);
                mm.emissiveIntensity = mm.userData._cei || 1;
                delete mm.userData._csl;
              }
            } else if (selectedMesh || isCslWeight){
              mm.transparent=false; mm.opacity=1; mm.depthWrite=true; mm.needsUpdate=true;
              if (isCslWeight && !selectedMesh && mm.emissive && !mm.userData._hl){
                if (!mm.userData._csl){ mm.userData._csl=true; mm.userData._ce=mm.emissive.getHex(); mm.userData._cei=mm.emissiveIntensity; }
                mm.emissive.setHex(0xe5323e); mm.emissiveIntensity = 0.42;
              }
            } else if (ghost){
              mm.transparent=true;
              mm.opacity=/GlassClear/.test(mm.name||'') ? 0.06 : 0.15;
              mm.depthWrite=false; mm.needsUpdate=true;
              if (mm.userData._csl){
                mm.emissive && mm.emissive.setHex(mm.userData._ce || 0);
                mm.emissiveIntensity = mm.userData._cei || 1;
                delete mm.userData._csl;
              }
            } else if (original){
              mm.transparent=original.t; mm.opacity=original.o; mm.depthWrite=original.d;
              mm.needsUpdate=true;
            }
          });
        });
        var wBadge = document.getElementById('hud-weight');
        if (wBadge) wBadge.hidden = !cslWeightMode;
        needsRender=true;
      }
      function syncAero(){
        var ab = document.getElementById('aero-flow');
        if (ab) ab.setAttribute('aria-pressed', aeroOn ? 'true' : 'false');
        var hb = document.getElementById('hud-aero');
        if (hb) hb.hidden = !aeroOn;
        if (aeroGroup) aeroGroup.visible = aeroOn;
        needsRender = true;
      }
      var TOUR_STOPS = [
        {dur:3.4, fn:function(){ setOpen('hood',false); setOpen('doors',false); aeroOn=false; syncAero(); flyToView('hero'); }},
        {dur:3.6, fn:function(){ setOpen('hood',true); flyToCamera(VIEWS.engine); }},
        {dur:3.6, fn:function(){ setOpen('hood',false); lightsOn=true; document.getElementById('lights').setAttribute('aria-pressed','true'); applyLights(); aeroOn=true; syncAero(); flyToCamera({p:[-3.9,1.55,3.8], t:[0,0.68,0]}); }},
        {dur:3.4, fn:function(){ flyToCamera({p:[2.2,1.35,-4.3], t:[0,0.62,-1.1]}); }},
        {dur:3.6, fn:function(){ aeroOn=false; syncAero(); setOpen('doors',true); flyToCamera(VIEWS.cockpit); }}
      ];
      function stopTour(){
        if (!tourActive) return;
        tourActive = false;
        var tb = document.getElementById('tour');
        if (tb) tb.setAttribute('aria-pressed','false');
      }
      function startTour(){
        clearSelection();
        tourActive = true; tourStep = 0; tourTimer = 0;
        var tb = document.getElementById('tour');
        if (tb) tb.setAttribute('aria-pressed','true');
        TOUR_STOPS[0].fn();
        needsRender = true;
      }
      document.getElementById('xray').addEventListener('click', function(){
        selectionAutoXray = false; // thao tác tay giữ quyền quyết định sau khi bỏ chọn
        xray=!xray;
        if (xray && cslWeightMode){ cslWeightMode=false; document.getElementById('csl-weight').setAttribute('aria-pressed','false'); }
        this.setAttribute('aria-pressed',xray?'true':'false');
        applyXrayVisuals();
      });
      document.getElementById('csl-weight').addEventListener('click', function(){
        cslWeightMode=!cslWeightMode;
        if (cslWeightMode && xray){ xray=false; selectionAutoXray=false; document.getElementById('xray').setAttribute('aria-pressed','false'); }
        this.setAttribute('aria-pressed',cslWeightMode?'true':'false');
        applyXrayVisuals();
      });
      document.getElementById('aero-flow').addEventListener('click', function(){ aeroOn=!aeroOn; syncAero(); });
      document.getElementById('spin').addEventListener('click', function(){
        stopTour();
        controls.autoRotate = !controls.autoRotate;
        this.setAttribute('aria-pressed', controls.autoRotate?'true':'false');
      });
      document.getElementById('tour').addEventListener('click', function(){
        if (tourActive) stopTour(); else startTour();
      });
      document.getElementById('steer').addEventListener('input', function(){
        var deg = Number(this.value);
        steerTarget = (deg * Math.PI) / 180;
        document.getElementById('steerval').textContent = (deg > 0 ? '+' : '') + deg + '°';
        needsRender = true;
      });
      document.getElementById('snapshot-btn').addEventListener('click', function(){
        if (!renderer || !scene || !camera) return;
        renderer.render(scene, camera);
        var a = document.createElement('a');
        a.download = 'bmw-m4-csl.png';
        a.href = renderer.domElement.toDataURL('image/png');
        a.click();
      });
      document.getElementById('lights').addEventListener('click', function(){
        lightsOn = !lightsOn; this.setAttribute('aria-pressed', lightsOn?'true':'false');
        applyLights();
      });
      /* Nút mở cửa / ca-pô / cốp */
      [['opendoors','doors'],['openhood','hood'],['opentrunk','trunk']].forEach(function(pair){
        document.getElementById(pair[0]).addEventListener('click', function(){
          if (pair[1] === 'hood') selectionOpenedHood = false;
          setOpen(pair[1], this.getAttribute('aria-pressed') !== 'true');
        });
      });
      document.getElementById('reset').addEventListener('click', function(){
        stopTour();
        clearSelection();
        selectionAutoXray = false; selectionOpenedHood = false; selectionReveal = false;
        document.getElementById('explode').value = 0; applyExplode(0);
        document.getElementById('steer').value = 0; steerTarget = 0; document.getElementById('steerval').textContent = '0°';
        if (xray) document.getElementById('xray').click();
        if (cslWeightMode){ cslWeightMode = false; document.getElementById('csl-weight').setAttribute('aria-pressed','false'); applyXrayVisuals(); }
        aeroOn = false; syncAero();
        if (lightsOn) document.getElementById('lights').click();
        setOpen('doors', false); setOpen('hood', false); setOpen('trunk', false);
        setPaint(0); setWheelFinish(0); setCaliperColor(0);
        environmentSelect.value = 'none'; setEnvironment('none');
        setGarageDoorsClosed(false);
        setGarageLight('warm');
        document.getElementById('search').value = '';
        document.getElementById('search').dispatchEvent(new Event('input'));
        controls.autoRotate = defaultAutoRotate;
        document.getElementById('spin').setAttribute('aria-pressed', controls.autoRotate ? 'true' : 'false');
        document.getElementById('selbar').hidden = true;
        var v = VIEWS.hero;
        fly = {t:0, fromP:camera.position.clone(), toP:new THREE.Vector3(v.p[0],v.p[1],v.p[2]), fromT:controls.target.clone(), toT:new THREE.Vector3(v.t[0],v.t[1],v.t[2])};
        document.querySelectorAll('.viewbtn').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.view === 'hero' ? 'true' : 'false'); });
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
        if (selected) pendingExplodedFocus = selected;
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

      /* Keep the current showroom setup when moving between VI and EN.
         The theme button changes the page in place; saving the same setup
         also makes a later language switch preserve the selected part. */
      var VIEW_STATE_KEY = 'bmw-m4-csl-view-v1';
      function saveViewState(){
        if (!carRoot || !controls) return;
        var paint = Array.prototype.findIndex.call(swEl.children,function(b){return b.getAttribute('aria-pressed')==='true';});
        var wheel = Array.prototype.findIndex.call(wheelSwEl.children,function(b){return b.getAttribute('aria-pressed')==='true';});
        var cal = Array.prototype.findIndex.call(calSwEl.children,function(b){return b.getAttribute('aria-pressed')==='true';});
        var view = document.querySelector('.viewbtn[aria-pressed="true"]');
        var state = {
          version:1, paint:paint, wheel:wheel, caliper:cal, environment:environmentSelect.value,
          garageDoorsClosed:garageDoors.front.target>0.5, garageLight:garageLightPreset,
          selected:selected, selectionAutoXray:selectionAutoXray, selectionOpenedHood:selectionOpenedHood,
          xray:xray, cslWeight:cslWeightMode, aero:aeroOn, steer:Number(document.getElementById('steer').value||0),
          lights:lightsOn, spin:controls.autoRotate, explode:explodeTarget,
          open:{doors:(setByWhich.doors||[]).some(function(s){return s.target!==0;}),
            hood:!!(setByWhich.hood&&setByWhich.hood.target),
            trunk:!!(setByWhich.trunk&&setByWhich.trunk.target)},
          view:view ? view.dataset.view : null,
          camera:camera.position.toArray(), target:controls.target.toArray()
        };
        try { sessionStorage.setItem(VIEW_STATE_KEY,JSON.stringify(state)); } catch(e){}
      }
      function restoreViewState(){
        var state;
        try { state=JSON.parse(sessionStorage.getItem(VIEW_STATE_KEY)); } catch(e){ return; }
        if (!state || state.version!==1) return;
        if (Number.isInteger(state.paint) && state.paint>=0 && state.paint<PAINTS.length) setPaint(state.paint);
        if (Number.isInteger(state.wheel) && state.wheel>=0 && state.wheel<WHEEL_FINISHES.length) setWheelFinish(state.wheel);
        if (Number.isInteger(state.caliper) && state.caliper>=0 && state.caliper<CALIPER_COLORS.length) setCaliperColor(state.caliper);
        if (state.selected && PARTS.some(function(p){return p.id===state.selected;})) selectPart(state.selected,false);
        xray=!!state.xray;
        cslWeightMode=!!state.cslWeight && !xray;
        selectionAutoXray=!!state.selectionAutoXray && !!selected;
        selectionOpenedHood=!!state.selectionOpenedHood && !!selected;
        document.getElementById('xray').setAttribute('aria-pressed',xray?'true':'false');
        document.getElementById('csl-weight').setAttribute('aria-pressed',cslWeightMode?'true':'false');
        applyXrayVisuals();
        aeroOn=!!state.aero; syncAero();
        if (Number.isFinite(state.steer)){
          var deg=Math.max(-28,Math.min(28,Math.round(state.steer)));
          document.getElementById('steer').value=deg;
          steerTarget=steerCur=(deg*Math.PI)/180;
          document.getElementById('steerval').textContent=(deg>0?'+':'')+deg+'°';
          layoutAll();
        }
        lightsOn=!!state.lights;
        document.getElementById('lights').setAttribute('aria-pressed',lightsOn?'true':'false');
        applyLights();
        if (state.open){
          ['doors','hood','trunk'].forEach(function(which){setOpen(which,!!state.open[which]);});
          layoutAll();
        }
        if (Number.isFinite(state.explode)){
          var amount=Math.max(0,Math.min(1,state.explode));
          document.getElementById('explode').value=Math.round(amount*100);
          explodeCur=amount; applyExplode(amount); layoutAll();
          pendingExplodedFocus=null;
        }
        if (state.view && VIEWS[state.view] && !selected){
          document.querySelectorAll('.viewbtn').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.view===state.view?'true':'false');});
        }
        if (Array.isArray(state.camera) && Array.isArray(state.target) &&
            state.camera.length===3 && state.target.length===3 &&
            state.camera.concat(state.target).every(Number.isFinite)){
          camera.position.fromArray(state.camera);
          controls.target.fromArray(state.target);
        }
        controls.autoRotate=!!state.spin && !reduceMotion;
        document.getElementById('spin').setAttribute('aria-pressed',controls.autoRotate?'true':'false');
        controls.update();
        setGarageDoorsClosed(!!state.garageDoorsClosed);
        garageDoors.front.cur=garageDoors.front.target;
        garageDoors.rear.cur=garageDoors.rear.target;
        setGarageLight(state.garageLight);
        if (state.environment && (state.environment==='none' || ENVIRONMENTS[state.environment])){
          environmentSelect.value=state.environment;
          setEnvironment(state.environment);
        }
        needsRender=true;
      }
      document.addEventListener('click',saveViewState);
      document.addEventListener('input',saveViewState);
      document.addEventListener('change',saveViewState);
      window.addEventListener('pagehide',saveViewState);

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
            if (fly.t>=1){ fly = null; saveViewState(); }
            needsRender = true;
          }
          if (tourActive){
            tourTimer += dt;
            if (tourTimer >= TOUR_STOPS[tourStep].dur){
              tourTimer = 0;
              tourStep = (tourStep + 1) % TOUR_STOPS.length;
              TOUR_STOPS[tourStep].fn();
            }
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
          if (Math.abs(steerCur - steerTarget) > 0.0005){
            var sd = steerTarget - steerCur;
            var sstep = reduceMotion ? Math.abs(sd) : dt * 2.8;
            steerCur += Math.abs(sd) <= sstep ? sd : (sd > 0 ? sstep : -sstep);
            layoutDirty = true;
          }
          if(activeEnvironment==='garage'){
            ['front','rear'].forEach(function(which){
              var door=garageDoors[which];
              if(door.cur===door.target)return;
              var difference=door.target-door.cur;
              var step=reduceMotion?Math.abs(difference):dt*1.2;
              door.cur+=Math.abs(difference)<=step?difference:(difference>0?step:-step);
              updateGarageShutter(which);
            });
            if(garageLightCurrent&&garageLightTarget){
              var delta=Math.max(
                Math.abs(garageLightCurrent.r-garageLightTarget.r),
                Math.abs(garageLightCurrent.g-garageLightTarget.g),
                Math.abs(garageLightCurrent.b-garageLightTarget.b)
              );
              if(delta>0.002){
                if(reduceMotion)garageLightCurrent.copy(garageLightTarget);
                else garageLightCurrent.lerp(garageLightTarget,Math.min(1,dt*5));
                updateGarageLighting();
              }
          }
          }
          if (layoutDirty) layoutAll();
          if (aeroOn && aeroStreams.length){
            aeroStreams.forEach(function(st){
              st.t = (st.t + dt * st.speed) % 1;
              st.curve.getPointAt(st.t, st.mesh.position);
            });
            needsRender = true;
          }
          if (pendingExplodedFocus && explodeCur === explodeTarget){
            var focusId = pendingExplodedFocus;
            pendingExplodedFocus = null;
            if (selected === focusId) flyToPart(focusId);
          }
          if (controls) controls.update();
          if(environmentShell && environmentShell.userData.overhead){
            var overhead=environmentShell.userData.overhead;
            var showOverhead=camera.position.y<environmentShell.userData.overheadHeight;
            if(overhead.visible!==showOverhead){overhead.visible=showOverhead;needsRender=true;}
          }
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
