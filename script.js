const canvas = document.getElementById("trendChart");
const ctx = canvas ? canvas.getContext("2d") : null;
const isChinesePage = document.documentElement.lang.toLowerCase().startsWith("zh");
const SUPABASE_URL = "https://fzvlmsoivrwilzrifxhr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9FmlFNXyx2l2v3OKKFTI7Q_bX2LUD0O";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }).then((registration) => {
      registration?.update?.();
    });
  });
}

document.querySelectorAll("[data-language-coming-soon]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const language = link.dataset.languageComingSoon || link.textContent.trim();
    const message = isChinesePage
      ? `${language}版本正在准备中。当前正式版本为 English 和 简体中文。`
      : `${language} edition is being prepared. English and Simplified Chinese are currently available.`;
    alert(message);
  });
});

document.addEventListener("click", (event) => {
  document.querySelectorAll(".language-switch[open]").forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute("open");
  });
});

function getSitePrefix() {
  return window.location.pathname.includes("/articles/") ? "../" : "";
}

function initLanguageSwitchFallback() {
  const existingSwitches = document.querySelectorAll(".language-switch");
  if (existingSwitches.length) {
    existingSwitches.forEach((switcher, index) => {
      if (index === 0) {
        switcher.classList.add("language-switch-root");
        document.body.appendChild(switcher);
      } else {
        switcher.remove();
      }
    });
    return;
  }

  const path = window.location.pathname;
  const file = path.split("/").pop() || "index.html";
  const inArticles = path.includes("/articles/");
  const lang = document.documentElement.lang.toLowerCase();
  const languageLabels = {
    en: "English",
    "zh-cn": "简体中文",
    "zh-hant": "繁體中文",
    ja: "日本語",
    ko: "한국어",
    de: "Deutsch",
    fr: "Français",
  };
  const currentLang = lang.startsWith("zh-hant")
    ? "zh-hant"
    : lang.startsWith("zh")
      ? "zh-cn"
      : lang.startsWith("ja")
        ? "ja"
        : lang.startsWith("ko")
          ? "ko"
          : lang.startsWith("de")
            ? "de"
            : lang.startsWith("fr")
              ? "fr"
              : "en";
  const homeLinks = {
    en: "index.html",
    "zh-cn": "zh.html",
    "zh-hant": "zh-hant.html",
    ja: "ja.html",
    ko: "ko.html",
    de: "de.html",
    fr: "fr.html",
  };
  const languageOrder = ["en", "zh-cn", "zh-hant", "ja", "ko", "de", "fr"];
  const languageAttrs = {
    en: "en",
    "zh-cn": "zh-CN",
    "zh-hant": "zh-Hant",
    ja: "ja",
    ko: "ko",
    de: "de",
    fr: "fr",
  };
  const articleTranslations = {
    "lithium-is-no-longer-just-an-ev-trade.html": {
      en: "lithium-is-no-longer-just-an-ev-trade.html",
      "zh-cn": "zh-lithium-is-no-longer-just-an-ev-trade.html",
      "zh-hant": "zh-hant-lithium-is-no-longer-just-an-ev-trade.html",
      ja: "ja-lithium-is-no-longer-just-an-ev-trade.html",
      ko: "ko-lithium-is-no-longer-just-an-ev-trade.html",
      de: "de-lithium-is-no-longer-just-an-ev-trade.html",
      fr: "fr-lithium-is-no-longer-just-an-ev-trade.html",
    },
    "the-next-ai-race-wont-be-won-by-the-smartest-model.html": {
      en: "the-next-ai-race-wont-be-won-by-the-smartest-model.html",
      "zh-cn": "zh-the-next-ai-race-wont-be-won-by-the-smartest-model.html",
      "zh-hant": "zh-hant-the-next-ai-race-wont-be-won-by-the-smartest-model.html",
      ja: "ja-the-next-ai-race-wont-be-won-by-the-smartest-model.html",
      ko: "ko-the-next-ai-race-wont-be-won-by-the-smartest-model.html",
      de: "de-the-next-ai-race-wont-be-won-by-the-smartest-model.html",
      fr: "fr-the-next-ai-race-wont-be-won-by-the-smartest-model.html",
    },
    "esg-is-no-longer-a-values-framework.html": {
      en: "esg-is-no-longer-a-values-framework.html",
      "zh-cn": "zh-esg-is-no-longer-a-values-framework.html",
      "zh-hant": "zh-hant-esg-is-no-longer-a-values-framework.html",
      ja: "ja-esg-is-no-longer-a-values-framework.html",
      ko: "ko-esg-is-no-longer-a-values-framework.html",
      de: "de-esg-is-no-longer-a-values-framework.html",
      fr: "fr-esg-is-no-longer-a-values-framework.html",
    },
    "nvidia-at-the-tollgate.html": {
      en: "nvidia-at-the-tollgate.html",
      "zh-cn": "zh-nvidia-at-the-tollgate.html",
    },
  };

  function baseArticleFile(name) {
    return name
      .replace(/^(zh-hant|zh|ja|ko|de|fr)-/, "")
      .replace(/^zh-cn-/, "");
  }

  function rootLinkFor(languageKey) {
    if (/^(zh-hant|zh|ja|ko|de|fr)\.html$/.test(file)) return homeLinks[languageKey];
    const section = file
      .replace(/^(zh-hant|zh|ja|ko|de|fr)-/, "")
      .replace(/^index\.html$/, "");
    if (!section) return homeLinks[languageKey];
    if (section === "disclosures.html" && !["en", "zh-cn"].includes(languageKey)) return null;
    const prefix = languageKey === "en" ? "" : languageKey === "zh-cn" ? "zh-" : `${languageKey}-`;
    return `${prefix}${section}`;
  }

  const links = inArticles
    ? articleTranslations[baseArticleFile(file)] || {}
    : Object.fromEntries(languageOrder.map((languageKey) => [languageKey, rootLinkFor(languageKey)]).filter(([, href]) => href));

  const details = document.createElement("details");
  details.className = "language-switch language-switch-root";
  details.innerHTML = `
    <summary aria-label="Language selector"><span>${languageLabels[currentLang] || "English"}</span></summary>
    <div class="language-menu" role="listbox" aria-label="Language options">
      ${languageOrder
        .filter((languageKey) => links[languageKey])
        .map((languageKey) => `<a${languageKey === currentLang ? ' class="is-active"' : ""} href="${links[languageKey]}" lang="${languageAttrs[languageKey]}">${languageLabels[languageKey]}</a>`)
        .join("")}
    </div>
  `;
  document.body.appendChild(details);
}

function initAppShell() {
  if (document.querySelector(".mobile-app-nav")) return;
  const prefix = getSitePrefix();
  const zh = isChinesePage;
  const home = zh ? `${prefix}zh.html#top` : `${prefix}#top`;
  const research = zh ? `${prefix}zh.html#insights` : `${prefix}#insights`;
  const watch = zh ? `${prefix}zh.html#companies` : `${prefix}#companies`;
  const reports = zh ? `${prefix}zh.html#research-library` : `${prefix}#research-library`;
  const nav = document.createElement("nav");
  nav.className = "mobile-app-nav";
  nav.setAttribute("aria-label", zh ? "移动端应用导航" : "Mobile app navigation");
  nav.innerHTML = `
    <a href="${home}" data-app-tab="home"><span aria-hidden="true">⌂</span><strong>${zh ? "首页" : "Home"}</strong></a>
    <a href="${research}" data-app-tab="research"><span aria-hidden="true">◇</span><strong>${zh ? "研究" : "Research"}</strong></a>
    <button class="market-search-trigger" type="button"><span aria-hidden="true">⌕</span><strong>${zh ? "搜索" : "Search"}</strong></button>
    <a href="${reports}" data-app-tab="reports"><span aria-hidden="true">▤</span><strong>${zh ? "报告" : "Reports"}</strong></a>
    <button class="subscribe-trigger" type="button"><span aria-hidden="true">＋</span><strong>${zh ? "订阅" : "Subscribe"}</strong></button>
  `;
  document.body.appendChild(nav);
}

function initReadingProgress() {
  const article = document.querySelector(".article-shell");
  if (!article || document.querySelector(".reading-progress")) return;
  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  progress.innerHTML = "<span></span>";
  document.body.prepend(progress);

  const bar = progress.querySelector("span");
  const update = () => {
    const rect = article.getBoundingClientRect();
    const total = Math.max(1, rect.height - window.innerHeight);
    const read = Math.min(total, Math.max(0, -rect.top));
    bar.style.transform = `scaleX(${read / total})`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

initLanguageSwitchFallback();
initAppShell();
initReadingProgress();

const strategyPoints = [100, 108, 101, 119, 127, 116, 132, 148, 139, 154, 163, 151, 168, 174, 181, 169, 176, 188, 181, 186.4];
const sp500Points = [100, 106, 102, 112, 118, 113, 122, 130, 126, 136, 143, 138, 150, 155, 158, 149, 154, 162, 158, 161.8];
const nasdaqPoints = [100, 112, 106, 126, 134, 121, 139, 152, 145, 158, 168, 154, 171, 179, 184, 166, 171, 181, 174, 174.2];
const dateLabels = ["2021", "2022", "2023", "2024", "2025", "2026"];
const points = strategyPoints;

function scalePoint(value, index) {
  const paddingX = 46;
  const paddingY = 48;
  const min = 92;
  const max = 194;
  const x = paddingX + (index / (points.length - 1)) * (canvas.width - paddingX * 2);
  const y = canvas.height - paddingY - ((value - min) / (max - min)) * (canvas.height - paddingY * 2);
  return { x, y };
}

function drawLine(values, color, width, offset = 0) {
  ctx.beginPath();
  values.forEach((value, index) => {
    const point = scalePoint(value + offset, index);
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();
}

function drawChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.48)";
  ctx.font = "700 18px Arial";
  ctx.fillText("Backtest Index, Base 100", 46, 46);

  ctx.fillStyle = "rgba(255, 255, 255, 0.36)";
  ctx.font = "700 11px Arial";
  dateLabels.forEach((label, index) => {
    const x = 46 + (index / (dateLabels.length - 1)) * (canvas.width - 92);
    ctx.fillText(label, x - 10, canvas.height - 18);
  });

  drawLine(sp500Points, "rgba(255, 255, 255, 0.35)", 2);
  drawLine(nasdaqPoints, "rgba(184, 134, 47, 0.72)", 2);
  drawLine(strategyPoints, "#8ee0c6", 4);

  const last = scalePoint(points[points.length - 1], points.length - 1);
  ctx.beginPath();
  ctx.arc(last.x, last.y, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#f6c565";
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.78)";
  ctx.font = "700 12px Arial";
  ctx.fillText(isChinesePage ? "策略示意 +86.4%" : "Strategy +86.4%", last.x - 104, last.y - 18);

  const legend = [
    [isChinesePage ? "策略示意" : "Strategy", "#8ee0c6"],
    [isChinesePage ? "纳指 100" : "Nasdaq 100", "#b8862f"],
    [isChinesePage ? "标普 500" : "S&P 500", "rgba(255, 255, 255, 0.55)"],
  ];

  legend.forEach(([label, color], index) => {
    const x = 46 + index * 122;
    const y = canvas.height - 42;
    ctx.beginPath();
    ctx.arc(x, y - 4, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.font = "700 12px Arial";
    ctx.fillText(label, x + 12, y);
  });
}

if (canvas && ctx) drawChart();

const companyGroups = [
  {
    name: "Innovation Tech",
    companies: [
      ["Apple", "苹果", "NASDAQ:AAPL", "AAPL", "硬件生态、服务收入和现金流质量长期领先。"],
      ["Microsoft", "微软", "NASDAQ:MSFT", "MSFT", "云计算、AI 平台和企业软件形成复合增长基础。"],
      ["NVIDIA", "英伟达", "NASDAQ:NVDA", "NVDA", "AI 算力、数据中心和加速计算的核心龙头。"],
      ["Alphabet", "谷歌母公司", "NASDAQ:GOOGL", "GOOGL", "搜索、云、AI 和广告生态具备全球规模优势。"],
      ["Amazon", "亚马逊", "NASDAQ:AMZN", "AMZN", "AWS、零售和广告业务共同驱动利润弹性。"],
      ["Meta", "Meta Platforms", "NASDAQ:META", "META", "社交广告基本盘强，AI 推荐提升商业化效率。"],
      ["Broadcom", "博通", "NASDAQ:AVGO", "AVGO", "半导体和基础设施软件兼具成长与现金流。"],
      ["AMD", "超威半导体", "NASDAQ:AMD", "AMD", "CPU、GPU 和数据中心业务持续参与 AI 周期。"],
      ["ASML", "阿斯麦", "NASDAQ:ASML", "ASML", "先进制程光刻机稀缺供应商，产业壁垒高。"],
      ["TSMC", "台积电", "NYSE:TSM", "TSM", "全球先进晶圆制造核心资产，受益高端芯片需求。"],
    ],
  },
  {
    name: "EV & New Energy",
    companies: [
      ["Tesla", "特斯拉", "NASDAQ:TSLA", "TSLA", "电动车、储能和自动驾驶叙事的全球代表。"],
      ["BYD", "比亚迪", "OTC:BYDDY", "BYDDY", "整车、电池和垂直供应链能力突出。"],
      ["Ferrari", "法拉利", "NYSE:RACE", "RACE", "高端汽车定价权强，电动化转型兼具品牌护城河。"],
      ["Toyota", "丰田", "NYSE:TM", "TM", "混动、燃油和电动路线并行，现金流稳健。"],
      ["General Motors", "通用汽车", "NYSE:GM", "GM", "北美汽车龙头，推进电动化和软件化转型。"],
      ["Ford", "福特", "NYSE:F", "F", "皮卡和商用车基础强，电动车业务具备周期弹性。"],
      ["ON Semiconductor", "安森美", "NASDAQ:ON", "ON", "车规功率半导体受益电动车高压平台。"],
      ["NXP", "恩智浦", "NASDAQ:NXPI", "NXPI", "汽车芯片和安全连接芯片具备长期需求。"],
      ["Allegro MicroSystems", "Allegro", "NASDAQ:ALGM", "ALGM", "磁传感和电源芯片切入汽车电动化。"],
      ["Aptiv", "安波福", "NYSE:APTV", "APTV", "汽车电子架构和智能驾驶供应链代表。"],
    ],
  },
  {
    name: "Lithium Resources",
    companies: [
      ["Albemarle", "雅保", "NYSE:ALB", "ALB", "全球锂化工龙头，周期波动中仍具资源地位。"],
      ["SQM", "智利矿业化工", "NYSE:SQM", "SQM", "盐湖锂资源优质，同时覆盖钾肥和碘业务。"],
      ["Lithium Americas", "美洲锂业", "NYSE:LAC", "LAC", "北美锂资源开发标的，弹性较高。"],
      ["Piedmont Lithium", "Piedmont", "NASDAQ:PLL", "PLL", "美国锂供应链本土化主题代表。"],
      ["Sigma Lithium", "Sigma", "NASDAQ:SGML", "SGML", "巴西硬岩锂矿项目，受益电池级锂需求。"],
      ["Pilbara Minerals", "Pilbara", "ASX:PLS", "PLS.AX", "澳洲锂辉石龙头，资源规模和产量优势明显。"],
      ["Mineral Resources", "Mineral Resources", "ASX:MIN", "MIN.AX", "锂矿与矿业服务结合，周期属性较强。"],
      ["Liontown Resources", "Liontown", "ASX:LTR", "LTR.AX", "澳洲新兴锂矿开发商，成长弹性较高。"],
      ["Rio Tinto", "力拓", "NYSE:RIO", "RIO", "综合矿业巨头，电池金属布局提升长期可选项。"],
      ["BHP", "必和必拓", "NYSE:BHP", "BHP", "全球矿业蓝筹，资源组合支撑周期配置价值。"],
    ],
  },
  {
    name: "Healthcare",
    companies: [
      ["Eli Lilly", "礼来", "NYSE:LLY", "LLY", "GLP-1、糖尿病和创新药管线驱动增长。"],
      ["Novo Nordisk", "诺和诺德", "NYSE:NVO", "NVO", "减重和糖尿病药物全球领先。"],
      ["UnitedHealth", "联合健康", "NYSE:UNH", "UNH", "医疗保险和健康服务平台规模优势明显。"],
      ["Johnson & Johnson", "强生", "NYSE:JNJ", "JNJ", "医药和医疗器械蓝筹，现金流稳定。"],
      ["Merck", "默沙东", "NYSE:MRK", "MRK", "肿瘤药和疫苗业务具备全球竞争力。"],
      ["AbbVie", "艾伯维", "NYSE:ABBV", "ABBV", "免疫、肿瘤和美学业务组合成熟。"],
      ["Intuitive Surgical", "直觉外科", "NASDAQ:ISRG", "ISRG", "手术机器人领域高壁垒代表。"],
      ["Thermo Fisher", "赛默飞", "NYSE:TMO", "TMO", "生命科学工具平台型公司，客户覆盖广。"],
      ["Danaher", "丹纳赫", "NYSE:DHR", "DHR", "诊断、生命科学和质量管理能力突出。"],
      ["AstraZeneca", "阿斯利康", "NASDAQ:AZN", "AZN", "肿瘤、罕见病和慢病管线国际化程度高。"],
    ],
  },
  {
    name: "Core Staples",
    companies: [
      ["Costco", "好市多", "NASDAQ:COST", "COST", "会员制零售护城河强，客流和续费率优异。"],
      ["Walmart", "沃尔玛", "NYSE:WMT", "WMT", "必选消费零售龙头，抗周期属性较强。"],
      ["Procter & Gamble", "宝洁", "NYSE:PG", "PG", "日化品牌组合稳定，定价权较强。"],
      ["Coca-Cola", "可口可乐", "NYSE:KO", "KO", "全球饮料品牌龙头，分红和现金流稳定。"],
      ["PepsiCo", "百事", "NASDAQ:PEP", "PEP", "饮料与零食组合平衡，消费韧性突出。"],
      ["McDonald's", "麦当劳", "NYSE:MCD", "MCD", "全球餐饮特许经营模式带来高资本效率。"],
      ["Home Depot", "家得宝", "NYSE:HD", "HD", "家装零售龙头，受益住房维护需求。"],
      ["Lowe's", "劳氏", "NYSE:LOW", "LOW", "家装消费和专业客户业务具备稳定需求。"],
      ["Philip Morris", "菲利普莫里斯", "NYSE:PM", "PM", "烟草和新型尼古丁产品贡献现金流。"],
      ["Mondelez", "亿滋", "NASDAQ:MDLZ", "MDLZ", "全球零食品牌组合，需求相对稳健。"],
    ],
  },
  {
    name: "Dividend Defense",
    companies: [
      ["Exxon Mobil", "埃克森美孚", "NYSE:XOM", "XOM", "能源蓝筹，油气现金流和股东回报较强。"],
      ["Chevron", "雪佛龙", "NYSE:CVX", "CVX", "综合能源巨头，分红稳定性受到市场关注。"],
      ["NextEra Energy", "新纪元能源", "NYSE:NEE", "NEE", "公用事业与新能源发电结合，防御性较好。"],
      ["Southern Company", "南方电力", "NYSE:SO", "SO", "美国公用事业公司，收益波动相对较低。"],
      ["Duke Energy", "杜克能源", "NYSE:DUK", "DUK", "受监管电力资产提供稳定现金流。"],
      ["Enbridge", "安桥", "NYSE:ENB", "ENB", "北美能源管道资产，派息属性突出。"],
      ["TC Energy", "TC 能源", "NYSE:TRP", "TRP", "天然气管道和能源基础设施防御性较强。"],
      ["Verizon", "威瑞森", "NYSE:VZ", "VZ", "通信运营商，现金流和分红吸引防御资金。"],
      ["AT&T", "美国电话电报", "NYSE:T", "T", "电信基础设施公司，高股息属性明显。"],
      ["Realty Income", "Realty Income", "NYSE:O", "O", "月度分红 REIT，商业地产租约稳定性较高。"],
    ],
  },
];

let activeGroupIndex = 0;
let activeSymbol = companyGroups[0].companies[0][2];
let activeSort = "score";

const tickerSymbolMap = {
  NVDA: "NASDAQ:NVDA",
  TSLA: "NASDAQ:TSLA",
  AAPL: "NASDAQ:AAPL",
  ASML: "NASDAQ:ASML",
  AVGO: "NASDAQ:AVGO",
  MSFT: "NASDAQ:MSFT",
  GOOGL: "NASDAQ:GOOGL",
  AMD: "NASDAQ:AMD",
  META: "NASDAQ:META",
  AMZN: "NASDAQ:AMZN",
  NFLX: "NASDAQ:NFLX",
  INTC: "NASDAQ:INTC",
  COST: "NASDAQ:COST",
  QQQ: "NASDAQ:QQQ",
  TSM: "NYSE:TSM",
  PLTR: "NASDAQ:PLTR",
  JPM: "NYSE:JPM",
  V: "NYSE:V",
  XOM: "NYSE:XOM",
  LLY: "NYSE:LLY",
  UNH: "NYSE:UNH",
  JNJ: "NYSE:JNJ",
  HD: "NYSE:HD",
  KO: "NYSE:KO",
  PG: "NYSE:PG",
  BHP: "ASX:BHP",
  SPY: "AMEX:SPY",
  VOO: "AMEX:VOO",
};

const zhGroupNames = ["创新科技", "新能源电车", "锂矿资源", "医疗健康", "核心消费", "高股息防御"];

const companyMetrics = {
  AAPL: [3700, 1020, 39, 95],
  MSFT: [3900, 1120, 37, 98],
  NVDA: [4500, 26500, 66, 88],
  GOOGL: [2500, 420, 45, 90],
  AMZN: [2400, 610, 56, 86],
  META: [1600, 720, 76, 82],
  AVGO: [1500, 7200, 42, 93],
  AMD: [260, 3900, 65, 78],
  ASML: [390, 760, 44, 89],
  TSM: [1100, 980, 49, 91],
  TSLA: [1200, 9500, 73, 76],
  BYDDY: [120, 1250, 61, 80],
  RACE: [85, 560, 38, 86],
  TM: [300, 120, 42, 74],
  GM: [55, 60, 54, 58],
  F: [50, 35, 58, 52],
  ON: [30, 520, 67, 62],
  NXPI: [65, 260, 45, 70],
  ALGM: [6, null, 62, 45],
  APTV: [25, 55, 76, 44],
  ALB: [15, 160, 82, 39],
  SQM: [14, 210, 76, 43],
  LAC: [3, null, 88, 28],
  PLL: [1, null, 91, 24],
  SGML: [2, null, 86, 30],
  "PLS.AX": [13, 1800, 79, 48],
  "MIN.AX": [7, 420, 73, 46],
  "LTR.AX": [2, null, 84, 29],
  RIO: [120, 120, 46, 64],
  BHP: [150, 130, 43, 66],
  LLY: [1100, 1850, 33, 94],
  NVO: [530, 720, 41, 90],
  UNH: [460, 520, 46, 85],
  JNJ: [380, 80, 31, 76],
  MRK: [330, 150, 35, 78],
  ABBV: [360, 310, 42, 80],
  ISRG: [180, 430, 55, 77],
  TMO: [210, 330, 44, 74],
  DHR: [160, 260, 48, 72],
  AZN: [260, 280, 36, 79],
  COST: [540, 760, 31, 92],
  WMT: [650, 240, 34, 84],
  PG: [390, 160, 28, 82],
  KO: [310, 85, 27, 78],
  PEP: [250, 120, 29, 77],
  MCD: [230, 210, 33, 78],
  HD: [380, 310, 46, 75],
  LOW: [170, 330, 47, 72],
  PM: [220, 70, 35, 68],
  MDLZ: [110, 115, 32, 68],
  XOM: [520, 95, 61, 70],
  CVX: [300, 85, 57, 69],
  NEE: [130, 210, 55, 61],
  SO: [110, 120, 29, 66],
  DUK: [90, 75, 31, 63],
  ENB: [85, 45, 43, 58],
  TRP: [45, 30, 48, 52],
  VZ: [170, -20, 45, 48],
  T: [120, -35, 50, 42],
  O: [45, 60, 47, 55],
};

function getCompanyMetric(quote) {
  const metric = companyMetrics[quote] || [0, null, 99, 0];
  return {
    marketCap: metric[0],
    tenYear: metric[1],
    drawdown: metric[2],
    score: metric[3],
  };
}

function formatMarketCap(value) {
  if (value >= 1000) return `$${(value / 1000).toFixed(value >= 2000 ? 1 : 2)}T`;
  return `$${value}B`;
}

function formatTenYear(value) {
  if (value === null) return isChinesePage ? "不足10年" : "<10Y";
  return `${value > 0 ? "+" : ""}${value}%`;
}

function yahooQuoteUrl(quote) {
  return `https://finance.yahoo.com/quote/${encodeURIComponent(quote)}`;
}

function tradingViewSymbolUrl(symbol) {
  const normalized = symbol.replace(":", "-");
  return `https://www.tradingview.com/symbols/${encodeURIComponent(normalized)}/`;
}

function companyForSymbol(symbol) {
  return companyGroups.flatMap((group) => group.companies).find((company) => company[2] === symbol);
}

function normalizeTickerSymbol(value) {
  const ticker = value.trim().toUpperCase();
  if (!ticker) return "";
  if (ticker.includes(":")) return ticker;
  if (tickerSymbolMap[ticker]) return tickerSymbolMap[ticker];
  if (/^[A-Z][A-Z0-9.-]{0,9}$/.test(ticker)) return `NASDAQ:${ticker}`;
  return "";
}

function initTickerSearch() {
  document.querySelectorAll(".ticker-search-form").forEach((form) => {
    if (form.dataset.tickerSearchReady === "true") return;
    form.dataset.tickerSearchReady = "true";
    const input = form.querySelector(".ticker-search-input");
    const error = form.querySelector(".ticker-search-error");
    if (!input) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const symbol = normalizeTickerSymbol(input.value);

      if (!symbol) {
        if (error) {
          error.textContent = isChinesePage
            ? "未找到该股票代码，请尝试使用交易所格式，例如 NASDAQ:NVDA"
            : "Ticker not found. Try the exchange format, for example NASDAQ:NVDA.";
        }
        return;
      }

      if (error) {
        error.textContent = "";
      }

      activeSymbol = symbol;
      renderCompanies();
      renderTradingViewChart(symbol);
      renderMarketSearchChart(symbol);
    });
  });
}

function createMarketSearchModal() {
  const prefix = getSitePrefix();
  const modal = document.createElement("div");
  modal.className = "market-search-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", isChinesePage ? "市场搜索" : "Market search");
  modal.hidden = true;
  modal.innerHTML = `
    <div class="market-search-backdrop" data-market-search-close></div>
    <section class="market-search-panel">
      <button class="market-search-close" type="button" aria-label="${isChinesePage ? "关闭" : "Close"}" data-market-search-close>×</button>
      <div class="market-search-heading">
        <span>${isChinesePage ? "Market Search" : "Market Search"}</span>
        <h2>${isChinesePage ? "搜索股票与 ETF 图表" : "Search Stocks & ETFs"}</h2>
        <p>${isChinesePage ? "输入股票代码或交易所格式，直接调取 TradingView 图表。" : "Enter a ticker or exchange format to load a TradingView chart."}</p>
      </div>
      <form class="ticker-search-form market-lookup-form market-search-form" aria-label="${isChinesePage ? "搜索股票代码" : "Search ticker"}">
        <label for="globalMarketSearchInput">${isChinesePage ? "股票代码" : "Ticker"}</label>
        <div class="market-lookup-row">
          <input
            id="globalMarketSearchInput"
            class="ticker-search-input"
            type="text"
            placeholder="${isChinesePage ? "NVDA 或 NASDAQ:NVDA" : "NVDA or NASDAQ:NVDA"}"
            autocomplete="off"
          />
          <button class="button primary" type="submit">${isChinesePage ? "查看图表" : "View Chart"}</button>
        </div>
        <p class="ticker-search-hint">${isChinesePage ? "支持 NVDA、AAPL、TSM、BHP、SPY、QQQ 等，也支持完整交易所格式。" : "Supports NVDA, AAPL, TSM, BHP, SPY, QQQ, and full exchange formats."}</p>
        <p class="ticker-search-error" aria-live="polite"></p>
        <a class="market-lookup-link" id="marketSearchExternalLink" href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" target="_blank" rel="noopener noreferrer">
          ${isChinesePage ? "打开 TradingView" : "Open on TradingView"}
        </a>
      </form>
      <div class="market-search-status">
        <span>${isChinesePage ? "当前图表" : "Active Chart"}</span>
        <strong id="marketSearchSymbolLabel">NASDAQ:AAPL</strong>
      </div>
      <div id="market-search-tradingview-chart" class="tradingview-chart market-search-chart"></div>
      <p class="chart-note">
        ${isChinesePage ? "图表由 TradingView 在线组件提供，可能因地区、网络或交易所数据权限显示延迟或无法加载。" : "Charts are powered by TradingView widgets and may be delayed or unavailable depending on region, network, and exchange data access."}
      </p>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-market-search-close]").forEach((button) => {
    button.addEventListener("click", closeMarketSearch);
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeMarketSearch();
  });
  initTickerSearch();
  return modal;
}

function getMarketSearchModal() {
  return document.querySelector(".market-search-modal") || createMarketSearchModal();
}

function openMarketSearch() {
  const modal = getMarketSearchModal();
  modal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => {
    modal.classList.add("is-visible");
    modal.querySelector(".ticker-search-input")?.focus();
  });
  renderMarketSearchChart(activeSymbol || "NASDAQ:AAPL");
}

function closeMarketSearch() {
  const modal = document.querySelector(".market-search-modal");
  if (!modal) return;
  modal.classList.remove("is-visible");
  document.body.classList.remove("modal-open");
  window.setTimeout(() => {
    if (!modal.classList.contains("is-visible")) modal.hidden = true;
  }, 180);
}

function initMarketSearchEntrypoints() {
  const header = document.querySelector(".site-header");
  if (header && !header.querySelector(".header-market-search")) {
    const button = document.createElement("button");
    button.className = "header-market-search market-search-trigger";
    button.type = "button";
    button.textContent = isChinesePage ? "市场搜索" : "Market Search";
    const subscribe = header.querySelector(".header-subscribe");
    header.insertBefore(button, subscribe || header.querySelector(".nav"));
  }

  document.querySelectorAll(".market-search-trigger").forEach((trigger) => {
    if (trigger.dataset.marketSearchReady === "true") return;
    trigger.dataset.marketSearchReady = "true";
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openMarketSearch();
    });
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".market-search-trigger");
    if (!trigger) return;
    event.preventDefault();
    openMarketSearch();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMarketSearch();
  });
}

function renderCompanyTabs() {
  const tabs = document.querySelector(".company-tabs");
  if (!tabs) return;

  tabs.innerHTML = "";
  companyGroups.forEach((group, index) => {
    const tab = document.createElement("button");
    tab.className = `company-tab${index === activeGroupIndex ? " is-active" : ""}`;
    tab.type = "button";
    tab.textContent = isChinesePage ? zhGroupNames[index] : group.name;
    tab.addEventListener("click", () => {
      activeGroupIndex = index;
      activeSymbol = companyGroups[index].companies[0][2];
      renderCompanies();
      renderCompanyTabs();
      renderTradingViewChart(activeSymbol);
    });
    tabs.appendChild(tab);
  });
}

function renderSortButtons() {
  document.querySelectorAll(".sort-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.sort === activeSort);
    button.onclick = () => {
      activeSort = button.dataset.sort;
      renderSortButtons();
      renderCompanies();
    };
  });
}

function renderCompanies() {
  const list = document.querySelector(".company-list");
  if (!list) return;

  list.innerHTML = "";
  const companies = [...companyGroups[activeGroupIndex].companies].sort((a, b) => {
    const left = getCompanyMetric(a[3]);
    const right = getCompanyMetric(b[3]);
    if (activeSort === "drawdown") return left.drawdown - right.drawdown;
    if (activeSort === "tenYear") return (right.tenYear ?? -9999) - (left.tenYear ?? -9999);
    return right[activeSort] - left[activeSort];
  });

  companies.forEach(([enName, cnName, symbol, quote, reason], index) => {
    const metrics = getCompanyMetric(quote);
    const card = document.createElement("article");
    card.className = `company-card${symbol === activeSymbol ? " is-active" : ""}`;

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute(
      "aria-label",
      isChinesePage ? `查看 ${cnName} ${symbol} 的在线价格图` : `View live price chart for ${enName} ${symbol}`,
    );
    button.addEventListener("click", () => {
      activeSymbol = symbol;
      renderCompanies();
      renderTradingViewChart(symbol);
    });

    const top = document.createElement("div");
    top.className = "company-card-top";

    const title = document.createElement("div");
    title.className = "company-name";
    title.textContent = isChinesePage ? cnName : enName;

    const badge = document.createElement("span");
    badge.className = "company-symbol";
    badge.textContent = symbol;

    top.append(title, badge);

    const subtitle = document.createElement("div");
    subtitle.textContent = isChinesePage ? enName : quote;

    const desc = document.createElement("p");
    desc.className = "company-reason";
    desc.textContent = isChinesePage
      ? reason
      : "Institutional watchlist name ranked by market cap, approximate 10-year appreciation, drawdown, and quality score.";

    const metricGrid = document.createElement("div");
    metricGrid.className = "company-metrics";
    metricGrid.innerHTML = `
      <span><small>${isChinesePage ? "排序" : "Rank"}</small><strong>#${index + 1}</strong></span>
      <span><small>${isChinesePage ? "市值" : "Market Cap"}</small><strong>${formatMarketCap(metrics.marketCap)}</strong></span>
      <span><small>${isChinesePage ? "10年增幅" : "10Y Return"}</small><strong>${formatTenYear(metrics.tenYear)}</strong></span>
      <span><small>${isChinesePage ? "最大回撤" : "Max DD"}</small><strong>-${metrics.drawdown}%</strong></span>
    `;

    button.append(top, subtitle, desc, metricGrid);

    const actions = document.createElement("div");
    actions.className = "company-actions";

    const link = document.createElement("a");
    link.href = yahooQuoteUrl(quote);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = isChinesePage ? "行情链接" : "Quote Link";

    const hint = document.createElement("span");
    hint.textContent = isChinesePage ? "点击卡片看图" : "Click card for chart";

    actions.append(link, hint);
    card.append(button, actions);
    list.appendChild(card);
  });
}

function renderTradingViewChartInto(target, symbol, options = {}) {
  const label = options.label || null;
  const externalLink = options.externalLink || null;
  const height = options.height || "430";
  if (!target) return;

  if (label) label.textContent = symbol;
  if (externalLink) externalLink.href = tradingViewSymbolUrl(symbol);
  target.classList.remove("has-live-chart");
  target.innerHTML = "";

  const company = companyForSymbol(symbol);
  const quote = company?.[3] || symbol.split(":").pop();
  const metrics = getCompanyMetric(quote);
  const fallback = document.createElement("div");
  fallback.className = "chart-fallback";
  fallback.innerHTML = `
    <span>${isChinesePage ? "本地研究视图" : "Local Research View"}</span>
    <h3>${company ? (isChinesePage ? company[1] : company[0]) : symbol}</h3>
    <p>${isChinesePage ? "外部行情图表可能因网络或地区限制无法加载。以下为本地研究口径指标，不构成投资建议。" : "External live charts may be unavailable due to network or regional restrictions. The metrics below are local research estimates and not investment advice."}</p>
    <div class="chart-fallback-grid">
      <div><small>${isChinesePage ? "市值" : "Market Cap"}</small><strong>${formatMarketCap(metrics.marketCap)}</strong></div>
      <div><small>${isChinesePage ? "10年增幅" : "10Y Return"}</small><strong>${formatTenYear(metrics.tenYear)}</strong></div>
      <div><small>${isChinesePage ? "最大回撤" : "Max Drawdown"}</small><strong>-${metrics.drawdown}%</strong></div>
      <div><small>${isChinesePage ? "质量评分" : "Quality Score"}</small><strong>${metrics.score}/100</strong></div>
    </div>
    <a href="${yahooQuoteUrl(quote)}" target="_blank" rel="noopener noreferrer">${isChinesePage ? "打开外部行情页" : "Open External Quote"}</a>
  `;
  target.appendChild(fallback);

  const widget = document.createElement("div");
  widget.className = "tradingview-widget-container__widget";
  target.appendChild(widget);

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
  script.async = true;
  script.text = JSON.stringify({
    symbol,
    width: "100%",
    height,
    locale: isChinesePage ? "zh_CN" : "en",
    colorTheme: "dark",
    autosize: true,
    hide_side_toolbar: false,
    details: true,
    calendar: false,
    showVolume: true,
    theme: "dark",
    interval: "D",
    allow_symbol_change: true,
    support_host: "https://www.tradingview.com",
  });
  script.addEventListener("error", () => {
    target.classList.remove("has-live-chart");
  });
  target.appendChild(script);

  const chartCheck = window.setInterval(() => {
    if (!target.isConnected) {
      window.clearInterval(chartCheck);
      return;
    }
    if (target.querySelector("iframe")) {
      target.classList.add("has-live-chart");
      window.clearInterval(chartCheck);
    }
  }, 600);

  window.setTimeout(() => window.clearInterval(chartCheck), 6000);
}

function renderTradingViewChart(symbol) {
  renderTradingViewChartInto(document.getElementById("tradingview-chart"), symbol, {
    label: document.getElementById("activeSymbolLabel"),
    externalLink: document.getElementById("tradingViewExternalLink"),
    height: "430",
  });
}

function renderMarketSearchChart(symbol) {
  renderTradingViewChartInto(document.getElementById("market-search-tradingview-chart"), symbol, {
    label: document.getElementById("marketSearchSymbolLabel"),
    externalLink: document.getElementById("marketSearchExternalLink"),
    height: "460",
  });
}

renderCompanyTabs();
renderSortButtons();
renderCompanies();
initTickerSearch();
initMarketSearchEntrypoints();
renderTradingViewChart(activeSymbol);

document.querySelectorAll(".email-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const inquiryType = data.get("inquiry_type");
    const message = data.get("message");
    const subject = "Policy Alpha Research Inquiry";
    const body = isChinesePage
      ? `Policy Alpha 研究交流请求\n\n姓名：${name}\n邮箱：${email}\n合作方式：${inquiryType}\n专业交流内容：${message}`
      : `Policy Alpha Research Inquiry\n\nName: ${name}\nEmail: ${email}\nInquiry Type: ${inquiryType}\nMessage: ${message}`;

    window.location.href = `mailto:policyalpharesearch@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});

function initResearchSubscribeForms() {
  document.querySelectorAll("[data-subscribe-form]").forEach((form) => {
    if (form.dataset.subscribeBound === "true") return;
    form.dataset.subscribeBound = "true";

    const status = form.querySelector(".subscribe-status");
    const submitButton = form.querySelector('button[type="submit"]');
    const emailInput = form.querySelector('input[name="email"]');
    const interestInput = form.querySelector('select[name="interest"]');

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = emailInput?.value.trim();
      if (!email) return;

      if (status) {
        status.className = "subscribe-status";
        status.textContent = isChinesePage ? "正在提交..." : "Submitting...";
      }
      if (submitButton) submitButton.disabled = true;

      const payload = {
        email,
        interest: interestInput?.value || "All research notes",
        source: form.dataset.source || window.location.pathname,
        language: document.documentElement.lang || "en",
        created_at: new Date().toISOString(),
      };

      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`Supabase insert failed: ${response.status}`);

        form.reset();
        if (status) {
          status.className = "subscribe-status is-success";
          status.textContent = isChinesePage
            ? "订阅成功。后续研究札记会发送到你的邮箱。"
            : "Subscription received. Future research notes will be sent to your inbox.";
        }
      } catch {
        if (status) {
          status.className = "subscribe-status is-error";
          status.textContent = isChinesePage
            ? "提交失败。请稍后再试，或直接邮件联系。"
            : "Submission failed. Please try again later or contact by email.";
        }
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  });
}

function createSubscribeModal() {
  let modal = document.querySelector(".subscribe-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "subscribe-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", isChinesePage ? "订阅观察笔记" : "Subscribe to Research Notes");
  modal.innerHTML = `
    <div class="subscribe-modal-panel">
      <button class="subscribe-modal-close" type="button" aria-label="${isChinesePage ? "关闭" : "Close"}">×</button>
      <form
        class="research-subscribe-form research-subscribe-modal-form"
        data-subscribe-form
        data-source="${isChinesePage ? "Policy Alpha Research modal - Chinese" : "Policy Alpha Research modal - English"}"
      >
        <div>
          <span>${isChinesePage ? "订阅观察笔记" : "Subscribe to Research Notes"}</span>
          <p>${isChinesePage ? "接收后续研究札记和报告更新。只用于研究分发，不做营销轰炸。" : "Receive future research notes and report updates. Research distribution only, no marketing blast."}</p>
        </div>
        <label>
          <span>${isChinesePage ? "邮箱" : "Email"}</span>
          <input type="email" name="email" placeholder="name@example.com" required />
        </label>
        <label>
          <span>${isChinesePage ? "关注方向" : "Interest"}</span>
          <select name="interest">
            <option value="${isChinesePage ? "全部研究札记" : "All research notes"}">${isChinesePage ? "全部研究札记" : "All research notes"}</option>
            <option value="${isChinesePage ? "AI 基础设施" : "AI Infrastructure"}">${isChinesePage ? "AI 基础设施" : "AI Infrastructure"}</option>
            <option value="${isChinesePage ? "关键矿产" : "Critical Minerals"}">${isChinesePage ? "关键矿产" : "Critical Minerals"}</option>
            <option value="${isChinesePage ? "ESG 与资本市场" : "ESG and Capital Markets"}">${isChinesePage ? "ESG 与资本市场" : "ESG and Capital Markets"}</option>
            <option value="${isChinesePage ? "宏观政策" : "Macro Policy"}">${isChinesePage ? "宏观政策" : "Macro Policy"}</option>
            <option value="${isChinesePage ? "仅研究报告" : "Reports only"}">${isChinesePage ? "仅研究报告" : "Reports only"}</option>
          </select>
        </label>
        <button class="button primary" type="submit">${isChinesePage ? "订阅" : "Subscribe"}</button>
        <p class="subscribe-status" aria-live="polite"></p>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  initResearchSubscribeForms();

  const close = () => modal.classList.remove("is-visible");
  modal.querySelector(".subscribe-modal-close").addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
  return modal;
}

document.querySelectorAll(".subscribe-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = createSubscribeModal();
    modal.classList.add("is-visible");
    window.setTimeout(() => modal.querySelector('input[name="email"]')?.focus(), 80);
  });
});

initResearchSubscribeForms();

let policyAlphaDeferredInstallPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  policyAlphaDeferredInstallPrompt = event;
});

async function copySaveUrl(url) {
  if (!navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

function saveSiteMessage(copied) {
  const isAppleMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isHarmonyOrHuawei = /HarmonyOS|HUAWEI|Huawei|HONOR|ArkWeb|Petal/i.test(navigator.userAgent);
  if (isChinesePage) {
    if (isAppleMobile) return "请点击浏览器分享按钮，然后选择“添加到主屏幕”。";
    if (isHarmonyOrHuawei) {
      return copied
        ? "网站地址已复制。如当前浏览器无法添加到主屏幕，请使用 Chrome、Edge 或系统浏览器菜单中的“添加到桌面”功能。"
        : "如当前浏览器无法添加到主屏幕，请使用 Chrome、Edge 或系统浏览器菜单中的“添加到桌面”功能。";
    }
    return copied
      ? "网站地址已复制。安卓 Chrome 如未弹出安装窗口，请刷新页面后再点一次；也可以点右上角菜单，选择“安装应用”或“添加到主屏幕”。"
      : "安卓 Chrome 如未弹出安装窗口，请刷新页面后再点一次；也可以点右上角菜单，选择“安装应用”或“添加到主屏幕”。";
  }
  if (isAppleMobile) return "Tap the browser Share button, then choose Add to Home Screen.";
  if (isHarmonyOrHuawei) {
    return copied
      ? "The site link has been copied. If your browser does not support Add to Home Screen, please try Chrome, Edge, or your system browser's Add to desktop option."
      : "If your browser does not support Add to Home Screen, please try Chrome, Edge, or your system browser's Add to desktop option.";
  }
  return copied
    ? "The site link has been copied. On Android Chrome, refresh once and tap this button again, or use the browser menu to choose Install app or Add to Home screen."
    : "On Android Chrome, refresh once and tap this button again, or use the browser menu to choose Install app or Add to Home screen.";
}

if (!document.querySelector(".article-shell")) {
  document.querySelectorAll(".save-site-button").forEach((button) => {
    button.addEventListener("click", async () => {
      if (policyAlphaDeferredInstallPrompt) {
        policyAlphaDeferredInstallPrompt.prompt();
        await policyAlphaDeferredInstallPrompt.userChoice;
        policyAlphaDeferredInstallPrompt = null;
        return;
      }

      const saveUrl = button.dataset.saveUrl || window.location.href;
      const copied = await copySaveUrl(saveUrl);
      window.alert(saveSiteMessage(copied));
    });
  });
}

const latestInsight = isChinesePage
  ? {
      id: "nvidia-at-the-tollgate-20260526",
      label: "New Insight",
      title: "NVIDIA：AI 基础设施的收费站",
      summary: "AI 基础设施周期有价格，而市场已经知道。完整估值报告已同步发布。",
      primary: "阅读文章",
      secondary: "稍后再看",
      url: "articles/zh-nvidia-at-the-tollgate.html",
    }
  : {
      id: "nvidia-at-the-tollgate-20260526",
      label: "New Insight",
      title: "NVIDIA at the Tollgate",
      summary: "The AI infrastructure cycle has a price — and the market already knows it. Full valuation report now available.",
      primary: "Read Note",
      secondary: "Later",
      url: "articles/nvidia-at-the-tollgate.html",
    };

function showInsightUpdate() {
  if (!document.body || window.location.hash === "#insights") return;
  const languageKey = isChinesePage ? "zh" : "en";
  const storageKey = `policy-alpha-insight-update-seen-${languageKey}`;
  const legacyStorageKey = `policy-alpha-seen-${latestInsight.id}-${languageKey}`;
  const hasSeenAnyInsightUpdate = () => {
    try {
      if (window.localStorage?.getItem(storageKey) === "1") return true;
      if (window.localStorage?.getItem(legacyStorageKey) === "1") return true;
      return Object.keys(window.localStorage || {}).some(
        (key) => key.startsWith("policy-alpha-seen-") && key.endsWith(`-${languageKey}`),
      );
    } catch {
      return false;
    }
  };
  const markInsightUpdateSeen = () => {
    try {
      window.localStorage?.setItem(storageKey, "1");
      window.localStorage?.setItem(legacyStorageKey, "1");
    } catch {}
  };

  if (hasSeenAnyInsightUpdate()) return;

  const overlay = document.createElement("div");
  overlay.className = "insight-update";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", latestInsight.label);
  overlay.innerHTML = `
    <div class="insight-update-panel">
      <button class="insight-update-close" type="button" aria-label="${isChinesePage ? "关闭" : "Close"}">×</button>
      <span>${latestInsight.label}</span>
      <h2>${latestInsight.title}</h2>
      <p>${latestInsight.summary}</p>
      <div class="insight-update-actions">
        <a class="button primary" href="${latestInsight.url}">${latestInsight.primary}</a>
        <button class="button quiet" type="button">${latestInsight.secondary}</button>
      </div>
    </div>
  `;

  const close = () => {
    markInsightUpdateSeen();
    overlay.classList.remove("is-visible");
    window.setTimeout(() => overlay.remove(), 180);
  };

  overlay.querySelector(".insight-update-close").addEventListener("click", close);
  overlay.querySelector(".insight-update-actions .button.quiet").addEventListener("click", close);
  overlay.querySelector(".insight-update-actions a").addEventListener("click", () => {
    markInsightUpdateSeen();
  });
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.isConnected) close();
  }, { once: true });

  document.body.appendChild(overlay);
  window.setTimeout(() => overlay.classList.add("is-visible"), 50);
}

window.setTimeout(showInsightUpdate, 1200);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll(".process-card, .allocation-card, .company-card, .risk-rules div").forEach((item) => {
  item.classList.add("fade-in");
  observer.observe(item);
});
