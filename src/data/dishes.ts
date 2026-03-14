export interface Dish {
  id: string;
  name: string;
  image: string;
  category: string;
  tags: string[];
  chefNote: string;
  ingredients: { name: string; amount: string }[];
}

export const dishes: Dish[] = [
  { 
    id: 'dongporou', 
    name: '东坡肉', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFrgqNH-4wqK2tsYySSsg1XoipKvfGAegLZkyKTQOU8QmdZ2trZFnWUIC6XhQeenPnFq76-8DVw5bQ3z7xfpv_7aVkmoefwdRQcOibignq0vt5UAw40_dfc0HohLFJyBmOtzDwLzbWIDgfLtsUuDkVp5AwEg0e8LyfN_HbdJtxB8lp6iFpwjEuS9PnY3KlRW_Y-E09t78YSF3DfvEC9ABU93sHXs0lI293_P5LxpmgyDvd8FEfzWSLW3UhD3yoRuLgRRWq_1TyJRlh', 
    category: '臻选肉食', 
    tags: ['经典名菜', '肥而不腻'], 
    chefNote: '选用半肥半瘦的猪肉，慢火慢炖，入口即化。', 
    ingredients: [{ name: '五花肉', amount: '500g' }, { name: '冰糖', amount: '50g' }, { name: '黄酒', amount: '200ml' }] 
  },
  { 
    id: 'hongshaorou', 
    name: '红烧肉', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuComwuazQowED-kIDYN6iXehzIRrXvS3Ub5f9445R1Tj2YhDpmPH7ZGMepqjb59DMhSVgp10aQr0DMVu-xJQT5X6irthMXXXsayBdRHVEA9genK89tzVSQhPApGWp8pygQickp2mZPdbh--SY3-En6-hw_ubYXY6p2gul5M6qdBPBp6piOI_Who-Dq_Kh_sLkx-GpceXi-WCf074TQvzigEk0hL3bvA6G0EssyUkpiq3KZ5lu7a7zXSlGquwwVzCJLdBOdBr4tc3V8X', 
    category: '臻选肉食', 
    tags: ['家常经典', '咸甜适口'], 
    chefNote: '色泽红亮，肥瘦相间，是下饭的绝佳选择。', 
    ingredients: [{ name: '五花肉', amount: '500g' }, { name: '老抽', amount: '2勺' }, { name: '生姜', amount: '适量' }] 
  },
  { 
    id: 'tangcupaigu', 
    name: '糖醋排骨', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLYp2H2xLS--ZMN5j9TVeOv1KOL1b1Yeup5Bf4mRLkTCdSqI6A4WzEVHYFC2-5NFJFFV-FS8FXK0coovt4LA430YFWIm4xcf1CtD3EO3N8sDDBVygM_Sv3H5Igg7zwpPU7EpYuOAh7dk3brLtDgQPvI_g7KuU8zhHG5fU6QRQH_G00Lx2iDqlYepKrwyLbkYRfm7sixjNNTb6_Dk4yL-2FLqosoCR-IFFlU0w8IYEqLw4fedluqO9grqFUbL7nCGcOZUziRdsVMhv6', 
    category: '臻选肉食', 
    tags: ['酸甜可口', '老少皆宜'], 
    chefNote: '排骨外酥里嫩，糖醋比例是关键，酸甜开胃。', 
    ingredients: [{ name: '猪小排', amount: '500g' }, { name: '陈醋', amount: '3勺' }, { name: '白糖', amount: '3勺' }] 
  },
  { 
    id: 'gongbaojiding', 
    name: '宫保鸡丁', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCylLC0D1e2k7wlocQzrBf0Q3stXUq_rc32UE9ApeTRb0awIa-cx2f_BOQQU-Z2F2eN5XrPFWfWRKNByUqdtxrWm5Db_ZpvKhWX0mxQYoAJgW14rAUNl2zAw4cqLnUXg9bysfPHJ6VIpmjsNPE8AO4W-PxKu0WSmBmwlwPh8EmcPp_OFR8td4XeHzTw59E3Uc8pMpwjQxpZh87koLn1GZP-qSPeQFQ1oOe7xbSYp3r1WKWgEh8kSmjboiwkjqemeNPyrkq3R1RuSsGx', 
    category: '臻选肉食', 
    tags: ['经典川菜', '中等辣度'], 
    chefNote: '选用上等鸡腿肉，肉质更加鲜嫩。花生米需最后下锅，炸至金黄酥脆是点睛之笔。注意火候，保持肉丁滑嫩而不柴。', 
    ingredients: [{ name: '鸡腿肉', amount: '300g' }, { name: '熟花生米', amount: '50g' }, { name: '干辣椒', amount: '10g' }, { name: '花椒', amount: '3g' }, { name: '黄瓜/大葱段', amount: '适量' }] 
  },
  { 
    id: 'qingzhengluyu', 
    name: '清蒸鲈鱼', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlwTFisw3AQTGo5oWFz6E1oMaZji9kRJeMc1ZWInyO4udMPPdVCOHfVm7bSHkJpWgBTinWDxhTZsfe4j-kDRR4NLkEE328pjrQIIrR5X2-Qc20M0f3IbcUGZxSLJ37ikqOxIOYlm6RDHTXCrZmg77A0iKjbBPXmG6yNWuA6QWTe2K3t6TTS7lD4EAMZ44y3-n2YRR3YKqFvVGZ8VaFSaXK_oGuHwdjQ93KBj7iTiTgWGjIHvnKJhc-4KEH7gNAb1J4cnPA4kdBRXwy', 
    category: '深海珍馐', 
    tags: ['清淡鲜美', '高蛋白'], 
    chefNote: '火候掌握在8-10分钟，出锅淋上热油激发出葱姜的香气。', 
    ingredients: [{ name: '鲈鱼', amount: '1条' }, { name: '葱姜丝', amount: '适量' }, { name: '蒸鱼豉油', amount: '2勺' }] 
  },
  { 
    id: 'youmendaxia', 
    name: '油焖大虾', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgB_LCPDL1xa5Z7sYZ0kCgZuk0936La2xcqOJArx8Iz6e35lbMROg0rKjVVd33eeVi3A9M8lQBZuOPmGqeyPNlbWr1UV0SAH2WOTXN6pcRSUttNFeO8BLU3pmUajJ2Pxj82S9ZMtfFIf84XixM5vIn84Nwuy-ALnxGx-gDWg-i4opLDGsx7MbbP7uytZ0skj8WXKJf8y4RTnQ10MBNRK7nVPkk7b2flC8nq_qkIkx2y3xcjqyg2H9Z1i49-1b2ICCERwqwzsjxX63u', 
    category: '深海珍馐', 
    tags: ['色泽红润', '鲜香微甜'], 
    chefNote: '虾头要煸出红油，这样烧出来的虾颜色才好看，味道才浓郁。', 
    ingredients: [{ name: '大虾', amount: '500g' }, { name: '番茄酱', amount: '1勺' }, { name: '白糖', amount: '1勺' }] 
  },
  { 
    id: 'mapodoufu', 
    name: '麻婆豆腐', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_4QYriIbFrN4jDV-iPMjD_mf8lZN_1tInw65ol5NLYNAo2EQDXFrsPw-2EUhHbEzPY75eLhRHzpNNSLonPG0ZwisCP7jx0NZ5ES_bIQDOYeoRCzIMPNTqX_svsj-P15q0obWDD4GInNfI0gD4xXnpI6ORlcp3fxxTtDB4AjAzqkGCJFgXn5Qr7knzxV5itEFW5UAM5cJ8KrDU58rRQ8skfhHaVQJlBD9Ind7tXuqTMxrBW-mqt9pv0Sxnuirf_ILEWorbfyoqi5ki', 
    category: '时令蔬鲜', 
    tags: ['麻辣鲜香', '下饭神器'], 
    chefNote: '豆腐切块后先用淡盐水焯一下，可以去除豆腥味，且不易碎。', 
    ingredients: [{ name: '嫩豆腐', amount: '1块' }, { name: '牛肉沫', amount: '50g' }, { name: '郫县豆瓣酱', amount: '1勺' }] 
  },
  { 
    id: 'qingchaoshishu', 
    name: '清炒时蔬', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxU3-FzWjYUY5irMRUp4ryF7tq1nzC2xlUnCl9jWw0SKg0zjn5TtAeqVN7Ti5GLnb20tsMwgbfSHid4r0J85N4_AOtd4uOL-FjZL9WjHhKz2pbC_Z-OtTH4aG8hfLsbm5rOKLYUR635nb-woz4fdZct8nJ0Xqn_BQtenmaKxUADubV5jB0z8I-ROiyuY4p6Iv9X1uohOpDB3ereWlpjwZfbdtkQU38MW-imQQmiZNyHoesP11P9rSPSnDsAsUFe8DuYc2nD1w0zDax', 
    category: '时令蔬鲜', 
    tags: ['清淡健康', '快手菜'], 
    chefNote: '大火快炒，保持蔬菜的清脆口感和翠绿颜色。', 
    ingredients: [{ name: '时令蔬菜', amount: '300g' }, { name: '蒜蓉', amount: '适量' }, { name: '盐', amount: '少许' }] 
  },
  { 
    id: 'fotiaoqiang', 
    name: '佛跳墙', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-ynaga9niuZYEmO9cZ8y9eAs5WxBgrQK52WuwOOJAHM--1Q8rEZPW02n-ljcYoK2jHjZQ3d_EUQF6UBaKFvYXcFJXSuFlu0fqg5SDgc3EX8tHBqHPiZVcU7EK7Pn53WF1Cru9TwNRhmaV4UlGCl1Fz3O1JveAAuZBN6aDSALsppuEZAkZa6dqrAGKKa90Dy9woLODveAh5g4lPOJZyx7latnuzzce99P9YPoQAx09n5nNPtWFLFr9jkYBuuNoeTlcTBaNbu0hP1aH', 
    category: '浓郁汤煲', 
    tags: ['滋补养生', '功夫菜'], 
    chefNote: '多种海鲜与肉类文火慢炖，汤汁浓郁，营养丰富。', 
    ingredients: [{ name: '鲍鱼/海参', amount: '适量' }, { name: '花胶/干贝', amount: '适量' }, { name: '高汤', amount: '1锅' }] 
  },
  { 
    id: 'xihuniurougeng', 
    name: '西湖牛肉羹', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9A9zs1GkMvVJjYnEllwUf298WLUFS9VWT3IOFtAqGkoKd9YOPQ4GMPo-_BstZmkxpvjBhwp6GwRqHyPnIceqLVKgXr4h2mJq43Bta9TIL6-L39C4IdBuxOn7BIMPSpiuuTpR4OcTuoV5rbERptpHv6P6dHSAbNIvxl_TeipVpnqNm0WFtfBpoa9FnpAx8CQDm7DkRrfnpavKkRNyMZnMfkrXknAzDx_4QmUm12ezRX7681zxecPBvozE-WF8FdtiJie-lVLPsCZDG', 
    category: '浓郁汤煲', 
    tags: ['清淡滑口', '开胃汤'], 
    chefNote: '牛肉要剁得极细，勾芡要均匀，最后撒上香菜提味。', 
    ingredients: [{ name: '牛肉沫', amount: '100g' }, { name: '豆腐', amount: '半块' }, { name: '鸡蛋清', amount: '1个' }] 
  },
  // New Dishes
  { 
    id: 'yangzhouchaofan', 
    name: '扬州炒饭', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Chinese_fried_rice_by_stu_spivack_in_Cleveland%2C_OH.jpg/1280px-Chinese_fried_rice_by_stu_spivack_in_Cleveland%2C_OH.jpg', 
    category: '精选主食', 
    tags: ['经典主食', '丰富配料'], 
    chefNote: '米饭要粒粒分明，配料切丁大小一致，翻炒均匀。', 
    ingredients: [{ name: '米饭', amount: '1碗' }, { name: '虾仁', amount: '50g' }, { name: '火腿丁', amount: '30g' }, { name: '鸡蛋', amount: '2个' }] 
  },
  { 
    id: 'congyoubanmian', 
    name: '葱油拌面', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/%E8%91%B1%E8%8A%B1%E8%91%B1%E6%B2%B9%E6%8B%8C%E9%9D%A2.jpg/1280px-%E8%91%B1%E8%8A%B1%E8%91%B1%E6%B2%B9%E6%8B%8C%E9%9D%A2.jpg', 
    category: '精选主食', 
    tags: ['上海风味', '葱香浓郁'], 
    chefNote: '熬制葱油是关键，小火慢熬至葱段焦黄，香气扑鼻。', 
    ingredients: [{ name: '细面条', amount: '150g' }, { name: '小葱', amount: '1把' }, { name: '生抽', amount: '2勺' }, { name: '老抽', amount: '1勺' }] 
  },
  { 
    id: 'xianrouxiaolongbao', 
    name: '鲜肉小笼包', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/A_Xiaolongbao_from_The_Modern_Shanghai.jpg/1280px-A_Xiaolongbao_from_The_Modern_Shanghai.jpg', 
    category: '精选主食', 
    tags: ['皮薄馅大', '汤汁丰盈'], 
    chefNote: '肉馅中加入皮冻是爆汁的秘诀，蒸制时间不宜过长。', 
    ingredients: [{ name: '面粉', amount: '200g' }, { name: '猪肉馅', amount: '150g' }, { name: '猪皮冻', amount: '100g' }] 
  },
  { 
    id: 'laweibaozaifan', 
    name: '腊味煲仔饭', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Claypot_Chicken_Rice%2C_Singapore.JPG/1280px-Claypot_Chicken_Rice%2C_Singapore.JPG', 
    category: '精选主食', 
    tags: ['广式经典', '锅巴焦香'], 
    chefNote: '火候控制很重要，最后淋上特制酱汁，拌匀后食用最佳。', 
    ingredients: [{ name: '丝苗米', amount: '150g' }, { name: '广式腊肠', amount: '1根' }, { name: '青菜', amount: '适量' }] 
  },
  { 
    id: 'xiarenshuijiao', 
    name: '虾仁水饺', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/%E5%8F%B0%E7%81%A3%E5%8D%97%E6%8A%95%E8%8D%89%E5%B1%AF%E6%B0%B4%E9%A4%83Nantou%2C_Taiwan_Caotun_dumplings.jpg/500px-%E5%8F%B0%E7%81%A3%E5%8D%97%E6%8A%95%E8%8D%89%E5%B1%AF%E6%B0%B4%E9%A4%83Nantou%2C_Taiwan_Caotun_dumplings.jpg', 
    category: '精选主食', 
    tags: ['鲜美多汁', '传统面食'], 
    chefNote: '每个饺子里包入一整颗虾仁，口感更佳。', 
    ingredients: [{ name: '饺子皮', amount: '20张' }, { name: '虾仁', amount: '20个' }, { name: '猪肉馅', amount: '100g' }] 
  },
  { 
    id: 'yuxiangrousi', 
    name: '鱼香肉丝', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Fish_flavoured_sliced_pork_from_Melbourne.jpg/1280px-Fish_flavoured_sliced_pork_from_Melbourne.jpg', 
    category: '臻选肉食', 
    tags: ['酸甜微辣', '下饭神菜'], 
    chefNote: '鱼香汁的比例是关键：糖、醋、酱油、料酒、水淀粉。', 
    ingredients: [{ name: '猪里脊', amount: '200g' }, { name: '木耳', amount: '50g' }, { name: '冬笋', amount: '50g' }] 
  },
  { 
    id: 'huiguorou', 
    name: '回锅肉', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Twice_cooked_pork%2C_Jia_Yan%2C_5_rue_Humblot%2C_Paris_003.jpg/1280px-Twice_cooked_pork%2C_Jia_Yan%2C_5_rue_Humblot%2C_Paris_003.jpg', 
    category: '臻选肉食', 
    tags: ['川菜之魂', '肥而不腻'], 
    chefNote: '五花肉先煮后炒，煸出多余油脂，加入蒜苗更香。', 
    ingredients: [{ name: '五花肉', amount: '300g' }, { name: '蒜苗', amount: '1把' }, { name: '豆瓣酱', amount: '1勺' }] 
  },
  { 
    id: 'suannibairou', 
    name: '蒜泥白肉', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/%E6%8B%9B%E7%89%8C%E8%92%9C%E6%B3%A5%E7%99%BD%E8%82%89.jpg/1280px-%E6%8B%9B%E7%89%8C%E8%92%9C%E6%B3%A5%E7%99%BD%E8%82%89.jpg', 
    category: '臻选肉食', 
    tags: ['凉菜经典', '蒜香浓郁'], 
    chefNote: '肉片要切得极薄，蒜泥红油汁要调得醇厚。', 
    ingredients: [{ name: '五花肉', amount: '300g' }, { name: '大蒜', amount: '1头' }, { name: '红油', amount: '2勺' }] 
  },
  { 
    id: 'laziji', 
    name: '辣子鸡', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Laziji_at_Beijing_Yibin_Hostel_%2820210625111300%29.jpg/1280px-Laziji_at_Beijing_Yibin_Hostel_%2820210625111300%29.jpg', 
    category: '臻选肉食', 
    tags: ['麻辣酥香', '越嚼越香'], 
    chefNote: '鸡块要炸至干香，辣椒和花椒的量要足，在辣椒里找肉吃。', 
    ingredients: [{ name: '带骨鸡腿', amount: '500g' }, { name: '干辣椒', amount: '1大把' }, { name: '花椒', amount: '1小把' }] 
  },
  { 
    id: 'suanrongfensizhengshanbei', 
    name: '蒜蓉粉丝蒸扇贝', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Sandiego_11_bg_010706.jpg/960px-Sandiego_11_bg_010706.jpg', 
    category: '深海珍馐', 
    tags: ['鲜香四溢', '宴客佳肴'], 
    chefNote: '蒜蓉要一半炸金黄一半生蒜混合，粉丝要提前泡软垫底。', 
    ingredients: [{ name: '扇贝', amount: '6个' }, { name: '粉丝', amount: '1小把' }, { name: '大蒜', amount: '2头' }] 
  },
  { 
    id: 'congshaohaishen', 
    name: '葱烧海参', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Braised_Guandong_Sea_Cucumber_with_Scallion_in_Sauce.jpg/1280px-Braised_Guandong_Sea_Cucumber_with_Scallion_in_Sauce.jpg', 
    category: '深海珍馐', 
    tags: ['鲁菜代表', '营养滋补'], 
    chefNote: '大葱要炸出浓郁的葱油，海参要煨透入味。', 
    ingredients: [{ name: '水发海参', amount: '3只' }, { name: '大葱白', amount: '2根' }, { name: '高汤', amount: '1碗' }] 
  },
  { 
    id: 'xiangjiansanwenyu', 
    name: '香煎三文鱼', 
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1280&auto=format&fit=crop', 
    category: '深海珍馐', 
    tags: ['西式风味', '外焦里嫩'], 
    chefNote: '煎制时先煎鱼皮面，保持鱼肉内部多汁，挤上柠檬汁解腻。', 
    ingredients: [{ name: '三文鱼排', amount: '200g' }, { name: '黑胡椒', amount: '少许' }, { name: '柠檬', amount: '半个' }] 
  },
  { 
    id: 'bifengtangchaoxie', 
    name: '避风塘炒蟹', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Chilli_crab-02.jpg/500px-Chilli_crab-02.jpg', 
    category: '深海珍馐', 
    tags: ['港式经典', '蒜香酥脆'], 
    chefNote: '大量的炸蒜蓉是灵魂，螃蟹要先炸熟再与蒜蓉同炒。', 
    ingredients: [{ name: '肉蟹', amount: '1只' }, { name: '大蒜', amount: '3头' }, { name: '面包糠', amount: '50g' }] 
  },
  { 
    id: 'yuxiangqiezi', 
    name: '鱼香茄子', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Qiezi.jpg/1280px-Qiezi.jpg', 
    category: '时令蔬鲜', 
    tags: ['软糯入味', '超级下饭'], 
    chefNote: '茄子先过油炸软，再用鱼香汁烧制，更加软糯入味。', 
    ingredients: [{ name: '长茄子', amount: '2根' }, { name: '肉沫', amount: '50g' }, { name: '鱼香汁', amount: '1碗' }] 
  },
  { 
    id: 'ganbiansijidou', 
    name: '干煸四季豆', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Making_Stir-Fry_%283286445383%29.jpg/1280px-Making_Stir-Fry_%283286445383%29.jpg', 
    category: '时令蔬鲜', 
    tags: ['干香微辣', '家常小炒'], 
    chefNote: '四季豆一定要煸熟透，表面起皱皮，加入芽菜肉沫更香。', 
    ingredients: [{ name: '四季豆', amount: '300g' }, { name: '猪肉沫', amount: '50g' }, { name: '碎米芽菜', amount: '20g' }] 
  },
  { 
    id: 'haoyoushengcai', 
    name: '蚝油生菜', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/OysterSauce2.jpg/1280px-OysterSauce2.jpg', 
    category: '时令蔬鲜', 
    tags: ['清脆爽口', '极简快手'], 
    chefNote: '生菜焯水时间要短，保持脆嫩，淋上热的蚝油汁即可。', 
    ingredients: [{ name: '生菜', amount: '1颗' }, { name: '蚝油', amount: '2勺' }, { name: '蒜蓉', amount: '适量' }] 
  },
  { 
    id: 'disanxian', 
    name: '地三鲜', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Disanxian.jpg/1280px-Disanxian.jpg', 
    category: '时令蔬鲜', 
    tags: ['东北名菜', '咸鲜软糯'], 
    chefNote: '土豆、茄子、青椒分别过油，再用酱汁快速翻炒均匀。', 
    ingredients: [{ name: '土豆', amount: '1个' }, { name: '茄子', amount: '1根' }, { name: '青椒', amount: '1个' }] 
  },
  { 
    id: 'paigulianoutang', 
    name: '排骨莲藕汤', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Pho-style_noodle_soup_%28cropped%29.jpg/960px-Pho-style_noodle_soup_%28cropped%29.jpg', 
    category: '浓郁汤煲', 
    tags: ['湖北特色', '清甜滋补'], 
    chefNote: '选用粉藕，慢火慢炖，汤汁清甜，莲藕软糯拉丝。', 
    ingredients: [{ name: '排骨', amount: '500g' }, { name: '莲藕', amount: '500g' }, { name: '生姜', amount: '3片' }] 
  },
  { 
    id: 'jiyudoufutang', 
    name: '鲫鱼豆腐汤', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Quail_07_bg_041506.jpg/960px-Quail_07_bg_041506.jpg', 
    category: '浓郁汤煲', 
    tags: ['汤白如奶', '鲜美无比'], 
    chefNote: '鲫鱼先两面煎黄，加入开水大火炖煮，汤汁才会奶白。', 
    ingredients: [{ name: '鲫鱼', amount: '1条' }, { name: '嫩豆腐', amount: '1块' }, { name: '葱姜', amount: '适量' }] 
  },
  { 
    id: 'laohuoliangtang', 
    name: '老火靓汤', 
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hot_Pot.jpg/1280px-Hot_Pot.jpg', 
    category: '浓郁汤煲', 
    tags: ['广式靓汤', '原汁原味'], 
    chefNote: '根据时令选择食材，文火慢煲数小时，只喝汤不吃渣。', 
    ingredients: [{ name: '猪骨', amount: '500g' }, { name: '玉米/胡萝卜', amount: '适量' }, { name: '无花果/蜜枣', amount: '少许' }] 
  }
];
