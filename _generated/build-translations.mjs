import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = "/Users/elenazhang/Documents/Codex/2026-05-19/new-chat";
const version = "20260525-stage-three-modules";

const languages = {
  "zh-hant": {
    htmlLang: "zh-Hant",
    label: "繁體中文",
    home: "zh-hant.html",
    articles: "zh-hant-articles.html",
    themes: "zh-hant-themes.html",
    methodology: "zh-hant-methodology.html",
    homeHref: "zh-hant.html",
    nav: ["首頁", "研究流程", "研究報告", "洞察", "研究主題", "研究方法", "關於"],
    current: "繁體中文",
    brandSmall: "宏觀與權益研究",
    title: "Policy Alpha Research | 政策、宏觀與權益研究",
    description: "Policy Alpha Research 是一個獨立宏觀與權益研究平台，聚焦政策變化、產業轉型與資本輪動。",
    heroEyebrow: "政策驅動的結構性研究",
    heroTitle: "在市場形成共識之前，識別結構性投資主題。",
    heroLead: "Policy Alpha Research 研究政策變化、產業轉型與資本輪動如何塑造長期市場領導力。",
    frameworkTitle: "研究框架",
    frameworkSteps: ["政策信號", "行業映射", "市場確認", "長期定位"],
    focusTitle: "研究重點",
    focus: ["AI 基礎設施", "能源轉型", "關鍵礦產", "半導體", "電網與電力系統", "宏觀政策變化"],
    aboutTitle: "關於 Policy Alpha Research",
    about: "Policy Alpha Research 是一個獨立宏觀與權益研究平台，致力於識別由政策變化、產業轉型與資本輪動推動的長週期投資主題。平台由 Elena Zhang 創立，結合政策分析、行業映射與市場確認，研究結構性敘事如何在市場共識形成之前演化。",
    disclaimer: "本頁為翻譯研究版本，僅供資訊與教育用途。內容不構成個人化投資建議、證券推薦、招股文件或任何金融產品建議。",
    read: "閱讀文章",
    save: "收藏網站",
    archiveTitle: "研究札記",
    archiveLead: "關於政策週期、戰略資產、行業輪動與長期資本配置的研究札記。",
    themesTitle: "Policy Alpha 的長期主題框架",
    methodologyTitle: "政策感知的宏觀與權益研究流程",
    methodologyLead: "研究流程把政策信號、產業變化、公司質量與風險治理整合到可複用的框架中。",
    coming: "翻譯研究版本",
    contact: "聯絡",
  },
  ja: {
    htmlLang: "ja",
    label: "日本語",
    home: "ja.html",
    articles: "ja-articles.html",
    themes: "ja-themes.html",
    methodology: "ja-methodology.html",
    homeHref: "ja.html",
    nav: ["ホーム", "プロセス", "レポート", "インサイト", "テーマ", "方法論", "概要"],
    current: "日本語",
    brandSmall: "マクロ・株式リサーチ",
    title: "Policy Alpha Research | 政策・マクロ・株式リサーチ",
    description: "Policy Alpha Research は、政策変化、産業変革、資本ローテーションに焦点を当てる独立系リサーチプラットフォームです。",
    heroEyebrow: "政策主導の構造的リサーチ",
    heroTitle: "市場のコンセンサスが形成される前に、構造的な投資テーマを特定する。",
    heroLead: "Policy Alpha Research は、政策変化、産業変革、資本ローテーションが長期的な市場リーダーをどのように形成するかを研究します。",
    frameworkTitle: "リサーチ・フレームワーク",
    frameworkSteps: ["政策シグナル", "セクター・マッピング", "市場確認", "長期ポジショニング"],
    focusTitle: "リサーチ領域",
    focus: ["AI インフラ", "エネルギー転換", "重要鉱物", "半導体", "電力網・電力システム", "マクロ政策シフト"],
    aboutTitle: "Policy Alpha Research について",
    about: "Policy Alpha Research は、政策変化、産業変革、資本ローテーションによって形成される長期投資テーマを特定する独立系マクロ・株式リサーチプラットフォームです。Elena Zhang が創設し、政策分析、セクター・マッピング、市場確認を組み合わせて、構造的な市場ナラティブの進化を研究します。",
    disclaimer: "本ページは翻訳されたリサーチ版です。情報提供および教育目的のみであり、個別の投資助言、証券の売買推奨、目論見書または金融商品の説明資料ではありません。",
    read: "記事を読む",
    save: "サイトを保存",
    archiveTitle: "リサーチノート",
    archiveLead: "政策レジーム、戦略資産、セクターローテーション、長期資本配分に関するリサーチノート。",
    themesTitle: "Policy Alpha の長期テーマ体系",
    methodologyTitle: "政策感応型マクロ・株式リサーチプロセス",
    methodologyLead: "政策シグナル、産業変化、企業品質、リスク管理を再現可能な研究フレームワークに統合します。",
    coming: "翻訳リサーチ版",
    contact: "連絡先",
  },
  ko: {
    htmlLang: "ko",
    label: "한국어",
    home: "ko.html",
    articles: "ko-articles.html",
    themes: "ko-themes.html",
    methodology: "ko-methodology.html",
    homeHref: "ko.html",
    nav: ["홈", "프로세스", "리포트", "인사이트", "테마", "방법론", "소개"],
    current: "한국어",
    brandSmall: "매크로 및 주식 리서치",
    title: "Policy Alpha Research | 정책·매크로·주식 리서치",
    description: "Policy Alpha Research는 정책 변화, 산업 전환, 자본 순환에 초점을 맞춘 독립 리서치 플랫폼입니다.",
    heroEyebrow: "정책 주도 구조적 리서치",
    heroTitle: "시장 컨센서스가 형성되기 전에 구조적 투자 테마를 식별합니다.",
    heroLead: "Policy Alpha Research는 정책 변화, 산업 전환, 자본 순환이 장기 시장 리더십을 어떻게 형성하는지 연구합니다.",
    frameworkTitle: "리서치 프레임워크",
    frameworkSteps: ["정책 신호", "섹터 매핑", "시장 확인", "장기 포지셔닝"],
    focusTitle: "리서치 포커스",
    focus: ["AI 인프라", "에너지 전환", "핵심 광물", "반도체", "전력망 및 전력 시스템", "거시 정책 변화"],
    aboutTitle: "Policy Alpha Research 소개",
    about: "Policy Alpha Research는 정책 변화, 산업 전환, 자본 순환이 만드는 장기 투자 테마를 식별하는 독립 매크로 및 주식 리서치 플랫폼입니다. Elena Zhang이 설립했으며 정책 분석, 섹터 매핑, 시장 확인을 결합해 구조적 내러티브가 시장 컨센서스 이전에 어떻게 발전하는지 연구합니다.",
    disclaimer: "이 페이지는 번역된 리서치 버전입니다. 정보 제공 및 교육 목적만을 위한 것이며 개인화된 투자 조언, 증권 매매 권유, 투자설명서 또는 금융상품 권유가 아닙니다.",
    read: "글 읽기",
    save: "사이트 저장",
    archiveTitle: "리서치 노트",
    archiveLead: "정책 체제, 전략 자산, 섹터 로테이션, 장기 자본 배분에 관한 리서치 노트.",
    themesTitle: "Policy Alpha의 장기 테마 프레임워크",
    methodologyTitle: "정책 인식형 매크로 및 주식 리서치 프로세스",
    methodologyLead: "정책 신호, 산업 변화, 기업 퀄리티, 리스크 거버넌스를 반복 가능한 연구 프레임워크로 통합합니다.",
    coming: "번역 리서치 버전",
    contact: "연락처",
  },
  de: {
    htmlLang: "de",
    label: "Deutsch",
    home: "de.html",
    articles: "de-articles.html",
    themes: "de-themes.html",
    methodology: "de-methodology.html",
    homeHref: "de.html",
    nav: ["Start", "Prozess", "Berichte", "Insights", "Themen", "Methodik", "Über"],
    current: "Deutsch",
    brandSmall: "Makro- und Aktienresearch",
    title: "Policy Alpha Research | Politik-, Makro- und Aktienresearch",
    description: "Policy Alpha Research ist eine unabhängige Plattform für Makro- und Aktienresearch mit Fokus auf politische Veränderungen, industrielle Transformation und Kapitalrotation.",
    heroEyebrow: "Politikgetriebenes strukturelles Research",
    heroTitle: "Strukturelle Investmentthemen erkennen, bevor sie Marktkonsens werden.",
    heroLead: "Policy Alpha Research untersucht, wie politische Veränderungen, industrielle Transformation und Kapitalrotation langfristige Marktführerschaft prägen.",
    frameworkTitle: "Research Framework",
    frameworkSteps: ["Politisches Signal", "Sektor-Mapping", "Marktbestätigung", "Langfristige Positionierung"],
    focusTitle: "Research-Schwerpunkte",
    focus: ["AI-Infrastruktur", "Energiewende", "Kritische Rohstoffe", "Halbleiter", "Stromnetze und Energiesysteme", "Makropolitische Veränderungen"],
    aboutTitle: "Über Policy Alpha Research",
    about: "Policy Alpha Research ist eine unabhängige Plattform für Makro- und Aktienresearch. Der Fokus liegt auf langfristigen Investmentthemen, die durch politische Veränderungen, industrielle Transformation und Kapitalrotation entstehen. Die von Elena Zhang gegründete Plattform kombiniert Politikanalyse, Sektor-Mapping und Marktbestätigung, um strukturelle Narrative vor dem Marktkonsens zu untersuchen.",
    disclaimer: "Diese Seite ist eine übersetzte Research-Fassung. Sie dient ausschließlich Informations- und Bildungszwecken und stellt keine persönliche Anlageberatung, Wertpapierempfehlung, Prospektunterlage oder Finanzproduktempfehlung dar.",
    read: "Artikel lesen",
    save: "Site speichern",
    archiveTitle: "Research Notes",
    archiveLead: "Research Notes zu politischen Regimen, strategischen Assets, Sektorrotation und langfristiger Kapitalallokation.",
    themesTitle: "Langfristige Themenstruktur von Policy Alpha",
    methodologyTitle: "Politiksensitiver Makro- und Aktienresearch-Prozess",
    methodologyLead: "Der Prozess verbindet politische Signale, industrielle Veränderungen, Unternehmensqualität und Risikosteuerung zu einem wiederholbaren Research-Framework.",
    coming: "Übersetzte Research-Fassung",
    contact: "Kontakt",
  },
  fr: {
    htmlLang: "fr",
    label: "Français",
    home: "fr.html",
    articles: "fr-articles.html",
    themes: "fr-themes.html",
    methodology: "fr-methodology.html",
    homeHref: "fr.html",
    nav: ["Accueil", "Processus", "Rapports", "Analyses", "Thèmes", "Méthode", "À propos"],
    current: "Français",
    brandSmall: "Recherche macro et actions",
    title: "Policy Alpha Research | Recherche politique, macro et actions",
    description: "Policy Alpha Research est une plateforme indépendante de recherche macro et actions axée sur les changements de politique, la transformation industrielle et la rotation du capital.",
    heroEyebrow: "Recherche structurelle guidée par les politiques publiques",
    heroTitle: "Identifier les thèmes d’investissement structurels avant qu’ils ne deviennent consensus.",
    heroLead: "Policy Alpha Research étudie comment les changements de politique, la transformation industrielle et la rotation du capital façonnent le leadership de marché à long terme.",
    frameworkTitle: "Cadre de recherche",
    frameworkSteps: ["Signal politique", "Cartographie sectorielle", "Confirmation du marché", "Positionnement long terme"],
    focusTitle: "Axes de recherche",
    focus: ["Infrastructure IA", "Transition énergétique", "Minéraux critiques", "Semi-conducteurs", "Réseaux électriques et systèmes d’énergie", "Changements de politique macro"],
    aboutTitle: "À propos de Policy Alpha Research",
    about: "Policy Alpha Research est une plateforme indépendante de recherche macro et actions visant à identifier les thèmes d’investissement de longue durée issus des changements de politique, de la transformation industrielle et de la rotation du capital. Fondée par Elena Zhang, la plateforme combine analyse des politiques, cartographie sectorielle et confirmation de marché pour étudier l’évolution des récits structurels avant le consensus.",
    disclaimer: "Cette page est une version de recherche traduite. Elle est fournie uniquement à des fins d’information et d’éducation et ne constitue ni un conseil en investissement personnalisé, ni une recommandation sur titres, ni un prospectus, ni une recommandation de produit financier.",
    read: "Lire l’article",
    save: "Enregistrer le site",
    archiveTitle: "Notes de recherche",
    archiveLead: "Notes sur les régimes politiques, les actifs stratégiques, la rotation sectorielle et l’allocation du capital à long terme.",
    themesTitle: "Cadre des thèmes de long terme de Policy Alpha",
    methodologyTitle: "Processus de recherche macro et actions sensible aux politiques publiques",
    methodologyLead: "Le processus combine signaux politiques, changements industriels, qualité des entreprises et gouvernance du risque dans un cadre de recherche reproductible.",
    coming: "Version de recherche traduite",
    contact: "Contact",
  },
};

const articleBase = [
  {
    slug: "esg-is-no-longer-a-values-framework",
    en: "ESG Is No Longer a Values Framework. It Is a Capital Access Filter.",
    zh: "ESG 不再只是价值观框架，它正在成为资本准入过滤器",
    series: "ESG & Capital Markets Series",
    decks: {
      "zh-hant": "ESG 正在從價值觀討論轉向市場准入系統，影響融資成本、供應鏈資格、機構持倉與長期估值。",
      ja: "ESG は価値観の議論から、市場アクセス、資本コスト、サプライチェーン適格性を左右する仕組みに移行しています。",
      ko: "ESG는 가치 논쟁을 넘어 자본 접근성, 공급망 자격, 기관 보유, 장기 밸류에이션을 좌우하는 필터가 되고 있습니다.",
      de: "ESG entwickelt sich von einer Werte-Debatte zu einem Zugangssystem für Kapital, Lieferketten und langfristige Bewertung.",
      fr: "L’ESG passe d’un débat de valeurs à un système d’accès au capital, aux chaînes d’approvisionnement et à la valorisation durable.",
    },
    bullets: {
      "zh-hant": ["ESG 正成為資本准入過濾器，而不只是道德偏好。", "CSRD、EuGBS、CBAM 與 Scope 3 披露正在把永續數據變成營運基礎設施。", "真正的研究重點是合規者與非合規者之間的資本成本與估值分化。"],
      ja: ["ESG は道徳的な選好ではなく、資本アクセスのフィルターになりつつあります。", "CSRD、EuGBS、CBAM、Scope 3 開示はサステナビリティ・データを業務インフラへ変えています。", "重要なのは、適合企業と非適合企業の資本コストと評価格差です。"],
      ko: ["ESG는 도덕적 선호가 아니라 자본 접근 필터로 작동하고 있습니다.", "CSRD, EuGBS, CBAM, Scope 3 공시는 지속가능성 데이터를 운영 인프라로 바꾸고 있습니다.", "핵심은 적합 기업과 비적합 기업 간 자본 비용 및 밸류에이션 격차입니다."],
      de: ["ESG wird zu einem Kapitalzugangsfilter, nicht nur zu einer moralischen Präferenz.", "CSRD, EuGBS, CBAM und Scope-3-Offenlegung machen Nachhaltigkeitsdaten zur operativen Infrastruktur.", "Entscheidend ist die Bewertungs- und Kapitalkostendifferenz zwischen kompatiblen und nicht kompatiblen Unternehmen."],
      fr: ["L’ESG devient un filtre d’accès au capital, pas seulement une préférence morale.", "CSRD, EuGBS, CBAM et les données Scope 3 transforment la durabilité en infrastructure opérationnelle.", "L’enjeu clé est l’écart de coût du capital et de valorisation entre entreprises compatibles et non compatibles."],
    },
  },
  {
    slug: "the-next-ai-race-wont-be-won-by-the-smartest-model",
    en: "The Next AI Race Won't Be Won by the Smartest Model",
    zh: "下一场 AI 竞赛，不只属于最聪明的模型",
    series: "AI Infrastructure Series",
    decks: {
      "zh-hant": "AI 智能體從助手走向自主工作者後，下一個競爭焦點可能不是模型智力，而是算力、能源與協調基礎設施。",
      ja: "AI エージェントが自律的な働き手へ進化するにつれ、次の競争軸はモデルの知能だけでなく、計算、電力、協調インフラになります。",
      ko: "AI 에이전트가 자율 작업자로 진화하면서 다음 경쟁의 핵심은 모델 지능보다 컴퓨팅, 전력, 조정 인프라가 될 수 있습니다.",
      de: "Wenn KI-Agenten zu autonomen Arbeitskräften werden, entscheidet nicht nur Modellintelligenz, sondern Rechenleistung, Energie und Koordinationsinfrastruktur.",
      fr: "À mesure que les agents IA deviennent des travailleurs autonomes, la prochaine course portera autant sur le calcul, l’énergie et la coordination que sur l’intelligence des modèles.",
    },
    bullets: {
      "zh-hant": ["AI 正從回答問題走向執行工作。", "軟體架構會從人類介面優先，轉向自動化與機器可讀系統。", "算力、記憶體、網路、資料中心、電力與網安可能成為下一輪瓶頸。"],
      ja: ["AI は質問への回答から実際の業務実行へ移行しています。", "ソフトウェアは人間向け UI から自動化優先・機械可読の構造へ変わります。", "計算、メモリ、ネットワーク、データセンター、電力、サイバーセキュリティが次の制約になり得ます。"],
      ko: ["AI는 질문 응답에서 실제 업무 실행으로 이동하고 있습니다.", "소프트웨어는 인간 인터페이스 중심에서 자동화 우선, 기계 판독 가능한 구조로 바뀔 수 있습니다.", "컴퓨팅, 메모리, 네트워크, 데이터센터, 전력, 사이버보안이 다음 병목이 될 수 있습니다."],
      de: ["KI verschiebt sich vom Beantworten von Fragen zum Ausführen realer Arbeit.", "Softwarearchitektur kann sich von menschlichen Interfaces zu automation-first und maschinenlesbaren Systemen verlagern.", "Compute, Speicher, Netzwerke, Rechenzentren, Strom und Cybersecurity können die nächsten Engpässe werden."],
      fr: ["L’IA passe de la réponse aux questions à l’exécution de tâches réelles.", "L’architecture logicielle peut passer d’interfaces humaines à des systèmes lisibles par machine et centrés sur l’automatisation.", "Calcul, mémoire, réseaux, centres de données, électricité et cybersécurité peuvent devenir les prochains goulets d’étranglement."],
    },
  },
  {
    slug: "lithium-is-no-longer-just-an-ev-trade",
    en: "Lithium Is No Longer Just an EV Trade",
    zh: "锂不再只是电动车交易",
    series: "Critical Minerals Series",
    decks: {
      "zh-hant": "鋰正在從單純電動車敘事，轉向由電網安全、產業政策與供應鏈韌性共同驅動的戰略材料主題。",
      ja: "リチウムは EV だけのテーマではなく、電力網の安全保障、産業政策、サプライチェーン強靭性に結びつく戦略素材になっています。",
      ko: "리튬은 더 이상 전기차만의 거래가 아니라 전력망 안보, 산업 정책, 공급망 회복력이 결합된 전략 소재 테마가 되고 있습니다.",
      de: "Lithium ist nicht mehr nur ein EV-Trade, sondern ein strategischer Rohstoff im Schnittpunkt von Netzsicherheit, Industriepolitik und Lieferkettenresilienz.",
      fr: "Le lithium n’est plus seulement un thème lié aux véhicules électriques : il devient un matériau stratégique lié à la sécurité du réseau, à la politique industrielle et à la résilience des chaînes d’approvisionnement.",
    },
    bullets: {
      "zh-hant": ["上一輪鋰周期更像敘事與動量交易。", "下一輪需求可能由儲能、電網安全與關鍵礦產政策共同推動。", "高質量運營商、資金能力與入場紀律比單純主題更重要。"],
      ja: ["前回のリチウムサイクルはナラティブとモメンタムの色彩が強いものでした。", "次の需要は蓄電、電力網の安全保障、重要鉱物政策に支えられる可能性があります。", "テーマそのものより、質の高い事業者、資金力、エントリー規律が重要です。"],
      ko: ["이전 리튬 사이클은 내러티브와 모멘텀 거래에 가까웠습니다.", "다음 수요는 에너지 저장, 전력망 안보, 핵심 광물 정책이 함께 이끌 수 있습니다.", "단순한 테마보다 우량 사업자, 자금 조달 능력, 진입 규율이 더 중요합니다."],
      de: ["Der vorherige Lithiumzyklus war stark von Narrativ und Momentum geprägt.", "Der nächste Nachfragezyklus kann durch Speicher, Netzsicherheit und kritische-Rohstoffe-Politik gestützt werden.", "Qualitätsbetreiber, Finanzierungsspielraum und Einstiegdisziplin sind wichtiger als das Thema allein."],
      fr: ["Le cycle précédent du lithium relevait largement d’un récit de momentum.", "La prochaine demande pourrait être portée par le stockage, la sécurité du réseau et les politiques sur les minéraux critiques.", "La qualité des opérateurs, la flexibilité financière et la discipline d’entrée comptent davantage que le thème seul."],
    },
  },
];

const articleBody = {
  "esg-is-no-longer-a-values-framework": {
    "zh-hant": [
      ["從敘事走向市場基礎設施", "早期 ESG 更像一種敘事：資產管理人談價值觀，企業發布永續報告，評級機構給出分數。但現在更重要的變化是，ESG 正被嵌入市場參與規則本身。CSRD、歐盟綠色債券標準與 CBAM 不是要求企業表態，而是在改變企業進入資本市場、供應鏈與跨境貿易體系的條件。"],
      ["資本准入機制", "當大型資產管理公司、退休基金、保險公司與主權基金把 ESG 數據納入風險模型時，影響的不只是聲譽，而是融資成本、流動性與估值折現率。缺乏可審核 ESG 框架的公司，可能面臨更高的股權風險溢價與更弱的長線機構持倉基礎。"],
      ["中型企業的壓力", "最容易被忽視的不是大型排放企業，而是全球供應鏈中的中型製造商。它們未必有足夠資源建立排放核算、第三方審核與供應鏈追蹤系統，但又必須滿足大型客戶的披露要求。ESG 合規成本可能加速產業集中，讓具備規模與合規基礎設施的企業獲得優勢。"],
      ["投資含義", "對政策驅動研究而言，ESG 不應被視為單獨的價值標籤，而應被納入企業質量、資本成本、供應鏈韌性與終值可持續性的分析框架。真正的機會在於識別哪些公司能留在全球資本架構內，哪些公司會被逐步排除。"],
    ],
    ja: [
      ["ナラティブから市場インフラへ", "初期の ESG は、価値観やブランド・ストーリーに近いものでした。資産運用会社はサステナビリティを語り、企業はレポートを発行し、格付け機関はスコアを付与しました。しかし現在の変化はより構造的です。CSRD、EU グリーンボンド基準、CBAM は、企業が資本市場、サプライチェーン、越境貿易に参加する条件そのものを変えつつあります。"],
      ["資本アクセスのメカニズム", "大手運用会社、年金基金、保険会社、ソブリンファンドが ESG データをリスク管理に組み込むと、影響は評判にとどまりません。資金調達コスト、流動性、株式リスクプレミアム、長期投資家の保有基盤に波及します。監査可能な ESG フレームワークを持たない企業は、資本アクセスの面で不利になり得ます。"],
      ["ミドルマーケットへの圧力", "見落とされがちなのは、大型排出企業ではなく、グローバル供給網に組み込まれた中堅メーカーです。排出量測定、第三者保証、サプライチェーン追跡の体制を構築する余力が限られる一方、大口顧客からデータ提供を求められます。ESG コンプライアンスは、産業の集中を加速させる可能性があります。"],
      ["投資上の示唆", "政策主導の分析では、ESG を価値観のラベルとしてではなく、企業品質、資本コスト、サプライチェーン耐性、ターミナルバリューの耐久性に関わる要素として扱うべきです。重要なのは、どの企業が新しい資本アーキテクチャの内側に残れるかです。"],
    ],
    ko: [
      ["내러티브에서 시장 인프라로", "초기 ESG는 가치와 브랜드 스토리에 가까웠습니다. 자산운용사는 지속가능성을 마케팅했고, 기업은 보고서를 냈으며, 평가기관은 점수를 매겼습니다. 그러나 지금의 변화는 훨씬 구조적입니다. CSRD, EU 그린본드 기준, CBAM은 기업이 자본시장, 공급망, 국경 간 무역에 참여하는 조건 자체를 바꾸고 있습니다."],
      ["자본 접근 메커니즘", "대형 운용사, 연기금, 보험사, 국부펀드가 ESG 데이터를 리스크 모델에 반영하면 영향은 평판에 그치지 않습니다. 조달 비용, 유동성, 주식 위험 프리미엄, 장기 기관 보유 기반으로 이어집니다. 감사 가능한 ESG 프레임워크가 없는 기업은 자본 접근 측면에서 구조적 불리함을 겪을 수 있습니다."],
      ["중견 기업의 압박", "가장 과소평가된 대상은 대형 배출 기업이 아니라 글로벌 공급망에 들어가 있는 중견 제조업체입니다. 이들은 배출량 산정, 제3자 검증, 공급망 추적 체계를 구축할 자원이 부족하지만 대형 고객의 데이터 요구를 충족해야 합니다. ESG 준수 비용은 산업 집중을 가속할 수 있습니다."],
      ["투자 시사점", "정책 주도 분석에서 ESG는 가치 라벨이 아니라 기업 퀄리티, 자본 비용, 공급망 회복력, 장기 가치 지속성을 평가하는 변수입니다. 핵심은 어떤 기업이 새로운 글로벌 자본 구조 안에 남을 수 있는지 식별하는 것입니다."],
    ],
    de: [
      ["Vom Narrativ zur Marktinfrastruktur", "Die frühe ESG-Phase war stark narrativ geprägt: Asset Manager sprachen über Werte, Unternehmen veröffentlichten Nachhaltigkeitsberichte, Ratingagenturen vergaben Scores. Heute ist die Veränderung struktureller. CSRD, der EU Green Bond Standard und CBAM verändern die Bedingungen, unter denen Unternehmen Zugang zu Kapitalmärkten, Lieferketten und grenzüberschreitendem Handel erhalten."],
      ["Der Kapitalzugangsmechanismus", "Wenn große Asset Manager, Pensionsfonds, Versicherer und Staatsfonds ESG-Daten in Risikomodelle integrieren, betrifft das nicht nur Reputation. Es beeinflusst Finanzierungskosten, Liquidität, Aktienrisikoprämien und die Stabilität der institutionellen Aktionärsbasis. Unternehmen ohne prüfbare ESG-Strukturen können einen strukturellen Kapitalzugangsnachteil erleiden."],
      ["Der Druck auf den Mittelstand", "Am meisten unterschätzt wird nicht der große Emittent, sondern der mittelgroße Zulieferer in globalen Lieferketten. Diese Unternehmen müssen Emissionsdaten, externe Prüfungen und Lieferkettennachweise liefern, verfügen aber oft nicht über die Infrastruktur großer Konzerne. ESG-Compliance kann deshalb industrielle Konzentration beschleunigen."],
      ["Implikationen für Investoren", "In einem politikgetriebenen Research-Prozess sollte ESG nicht als Werteetikett behandelt werden, sondern als Variable für Unternehmensqualität, Kapitalkosten, Lieferkettenresilienz und Terminal-Value-Dauerhaftigkeit. Die entscheidende Frage lautet, welche Unternehmen innerhalb der neuen Kapitalarchitektur bleiben können."],
    ],
    fr: [
      ["Du récit à l’infrastructure de marché", "La première phase de l’ESG relevait surtout du récit : les gestionnaires d’actifs parlaient de valeurs, les entreprises publiaient des rapports de durabilité, les agences attribuaient des scores. La phase actuelle est plus structurelle. La CSRD, le standard européen des obligations vertes et le CBAM modifient les conditions d’accès aux marchés de capitaux, aux chaînes d’approvisionnement et au commerce transfrontalier."],
      ["Le mécanisme d’accès au capital", "Lorsque les grands gestionnaires, fonds de pension, assureurs et fonds souverains intègrent les données ESG dans leurs modèles de risque, l’impact dépasse la réputation. Il touche le coût de financement, la liquidité, la prime de risque actions et la stabilité de l’actionnariat institutionnel. Les entreprises sans cadre ESG vérifiable peuvent subir un désavantage structurel d’accès au capital."],
      ["La pression sur le mid-market", "Le risque le plus sous-estimé concerne moins les grands émetteurs que les fournisseurs industriels de taille intermédiaire. Ils doivent fournir des données d’émissions, des audits et une traçabilité de chaîne d’approvisionnement, sans toujours disposer de l’infrastructure des grands groupes. La conformité ESG peut donc accélérer la concentration industrielle."],
      ["Implications d’investissement", "Dans une approche de recherche guidée par les politiques publiques, l’ESG doit être analysé comme une variable de qualité d’entreprise, de coût du capital, de résilience de chaîne d’approvisionnement et de durabilité de la valeur terminale. La vraie question est de savoir quelles entreprises resteront compatibles avec la nouvelle architecture du capital mondial."],
    ],
  },
  "the-next-ai-race-wont-be-won-by-the-smartest-model": {
    "zh-hant": [
      ["從智能走向執行", "過去兩年，AI 競賽主要圍繞模型能力：更大的模型、更強的推理、更多算力。下一階段的核心可能不只是回答問題，而是能否可靠地完成工作。當 AI 智能體開始調用工具、操作軟體、連接 API 並執行多步流程，市場需要重新理解 AI 的基礎設施層。"],
      ["軟體堆疊的假設改變", "傳統軟體假設人坐在介面前。若這個假設被削弱，機器可讀系統、流程編排、權限管理與自動化優先架構會變得更重要。這意味著投資機會不只在模型公司，也在支撐智能體經濟運行的底層系統。"],
      ["下一個瓶頸", "如果數百萬智能體同時運行，瓶頸可能轉向推理算力、記憶體、網路、資料中心容量、電力供應與網安。AI 將越來越像一場工業基礎設施周期，而不只是傳統軟體周期。"],
      ["投資框架", "政策和資本可能流向能降低 AI 執行成本、提高可靠性並支撐規模化部署的環節。真正值得研究的是哪些企業控制了算力、能源、資料中心、網路與安全層的關鍵瓶頸。"],
    ],
    ja: [
      ["知能から実行へ", "過去 2 年の AI 競争は、より大きなモデル、より強い推論、より多い計算資源を中心に語られてきました。次の段階では、単に答えを出せるかではなく、実際の仕事を安定して完了できるかが重要になります。AI エージェントがツールを呼び出し、ソフトウェアを操作し、API と連携し、複数ステップの業務を実行する時、投資家はインフラ層を見直す必要があります。"],
      ["ソフトウェア・スタックの前提変更", "従来のソフトウェアは、人間がインターフェースの前にいるという前提で設計されてきました。この前提が弱まると、機械可読なシステム、ワークフローのオーケストレーション、権限管理、自動化優先の設計がより重要になります。機会はモデル企業だけでなく、エージェント経済を支える基盤にも広がります。"],
      ["次のボトルネック", "数百万のエージェントが同時に稼働するなら、制約は推論計算、メモリ、ネットワーク、データセンター容量、電力供給、サイバーセキュリティに移ります。AI は従来のソフトウェアサイクルではなく、産業インフラの変革に近づいていきます。"],
      ["投資フレームワーク", "政策と資本は、AI の実行コストを下げ、信頼性を高め、スケール展開を支える領域へ向かう可能性があります。重要なのは、計算、電力、データセンター、ネットワーク、安全保障のボトルネックを握る企業です。"],
    ],
    ko: [
      ["지능에서 실행으로", "지난 2년간 AI 경쟁은 더 큰 모델, 더 강한 추론, 더 많은 컴퓨팅을 중심으로 전개되었습니다. 다음 단계에서는 단순히 답을 잘하는지가 아니라 실제 업무를 안정적으로 완수할 수 있는지가 중요해집니다. AI 에이전트가 도구를 호출하고, 소프트웨어를 조작하고, API와 연결하며, 다단계 업무를 수행할 때 인프라 계층의 가치가 부각됩니다."],
      ["소프트웨어 스택의 전제 변화", "전통적인 소프트웨어는 인간이 인터페이스 앞에 있다는 전제로 설계되었습니다. 이 전제가 약해지면 기계 판독 가능한 시스템, 워크플로 오케스트레이션, 권한 관리, 자동화 우선 아키텍처가 더 중요해집니다. 기회는 모델 회사뿐 아니라 에이전트 경제를 가능하게 하는 기반 시스템으로 확장됩니다."],
      ["다음 병목", "수백만 개의 에이전트가 동시에 작동한다면 병목은 추론 컴퓨팅, 메모리, 네트워크, 데이터센터 용량, 전력 공급, 사이버보안으로 이동할 수 있습니다. AI는 전통적인 소프트웨어 사이클보다 산업 인프라 전환에 가까워집니다."],
      ["투자 프레임워크", "정책과 자본은 AI 실행 비용을 낮추고 신뢰성을 높이며 대규모 배치를 가능하게 하는 영역으로 향할 가능성이 있습니다. 핵심은 컴퓨팅, 전력, 데이터센터, 네트워크, 보안 계층의 병목을 통제하는 기업입니다."],
    ],
    de: [
      ["Von Intelligenz zu Ausführung", "In den vergangenen zwei Jahren wurde der AI-Wettlauf vor allem über Modellleistung definiert: größere Modelle, stärkere Schlussfolgerung, mehr Compute. Die nächste Phase wird stärker davon abhängen, ob Systeme echte Arbeit zuverlässig ausführen können. Wenn AI-Agenten Tools aufrufen, Software bedienen, APIs verbinden und mehrstufige Prozesse abarbeiten, rückt die Infrastruktur unterhalb der Modelle in den Vordergrund."],
      ["Eine neue Annahme im Software-Stack", "Traditionelle Software wurde unter der Annahme gebaut, dass ein Mensch vor der Oberfläche sitzt. Wenn diese Annahme schwächer wird, gewinnen maschinenlesbare Systeme, Workflow-Orchestrierung, Berechtigungsmanagement und automation-first Architektur an Bedeutung. Die Chance liegt nicht nur bei Modellanbietern, sondern bei den Systemen, die eine Agentenökonomie ermöglichen."],
      ["Der nächste Engpass", "Wenn Millionen Agenten parallel laufen, können Inferenz-Compute, Speicher, Netzwerke, Rechenzentrumskapazität, Stromversorgung und Cybersecurity zu Engpässen werden. AI ähnelt dann weniger einem klassischen Softwarezyklus und mehr einer industriellen Infrastrukturtransformation."],
      ["Investment-Framework", "Politik und Kapital dürften in Bereiche fließen, die Ausführungskosten senken, Zuverlässigkeit erhöhen und Skalierung ermöglichen. Entscheidend ist, welche Unternehmen die Engpässe in Compute, Energie, Rechenzentren, Netzwerken und Sicherheit kontrollieren."],
    ],
    fr: [
      ["De l’intelligence à l’exécution", "Depuis deux ans, la course à l’IA est surtout définie par la puissance des modèles : modèles plus grands, raisonnement plus fort, davantage de calcul. La prochaine phase dépendra davantage de la capacité des systèmes à accomplir un vrai travail de manière fiable. Quand les agents IA appellent des outils, utilisent des logiciels, se connectent à des API et exécutent des processus complexes, l’infrastructure sous-jacente devient centrale."],
      ["Un nouveau postulat pour le logiciel", "Le logiciel traditionnel suppose qu’un humain se trouve devant l’interface. Si cette hypothèse s’affaiblit, les systèmes lisibles par machine, l’orchestration des flux, la gestion des permissions et les architectures orientées automatisation deviennent plus importants. L’opportunité dépasse les modèles et s’étend aux systèmes qui rendent possible l’économie des agents."],
      ["Le prochain goulet d’étranglement", "Si des millions d’agents fonctionnent simultanément, les contraintes peuvent se déplacer vers l’inférence, la mémoire, les réseaux, les centres de données, l’électricité et la cybersécurité. L’IA ressemble alors moins à un cycle logiciel classique qu’à une transformation industrielle de l’infrastructure."],
      ["Cadre d’investissement", "Les politiques publiques et le capital peuvent se diriger vers les segments qui réduisent le coût d’exécution, augmentent la fiabilité et permettent le déploiement à grande échelle. La question clé est de savoir quelles entreprises contrôlent les goulets d’étranglement du calcul, de l’énergie, des centres de données, des réseaux et de la sécurité."],
    ],
  },
  "lithium-is-no-longer-just-an-ev-trade": {
    "zh-hant": [
      ["不再只是電動車敘事", "上一輪鋰周期主要由電動車敘事與動量資金推動。當 EV 情緒高漲時，鋰價和相關股票上升；當情緒退潮時，投機性公司大幅回撤。但下一輪周期可能不只由 EV 滲透率驅動，而是由電網安全、儲能、產業政策與供應鏈戰略共同塑造。"],
      ["戰略材料框架", "儲能系統正在成為鋰需求的第二條結構性主線。隨著電網需要更高韌性，關鍵礦產逐漸被納入國家產業政策與供應鏈安全框架。這不會消除周期波動，但會改變高質量資產在低谷中的風險輪廓。"],
      ["質量比主題更重要", "主題投資最大的風險是把好敘事誤認為好投資。下一輪鋰周期中，真正值得研究的可能不是最投機的標的，而是具備可擴張產能、資金彈性、運營紀律與戰略相關性的企業。"],
      ["入場紀律", "即使結構性主題正確，價格也會決定回報。當旅遊資金退出、估值重置、情緒耗盡時，長期機會往往更清晰。鋰的下一階段更像戰略材料周期，而不只是 EV 成長股交易。"],
    ],
    ja: [
      ["EV ナラティブだけではない", "前回のリチウムサイクルは、EV ナラティブとモメンタム資金に大きく左右されました。EV への期待が高まるとリチウム価格と関連株は上昇し、期待が後退すると投機的な企業は大きく下落しました。しかし次のサイクルは、EV 普及率だけでなく、電力網の安全保障、蓄電、産業政策、サプライチェーン戦略によって形成される可能性があります。"],
      ["戦略素材としての枠組み", "蓄電システムは、リチウム需要における第二の構造的ドライバーになりつつあります。電力網により高い耐性が求められる中、重要鉱物は国家の産業政策と供給網安全保障に組み込まれています。これはボラティリティを消すものではありませんが、質の高い資産のリスク特性を変えます。"],
      ["テーマより品質", "テーマ投資で最も危険なのは、良いナラティブを良い投資と混同することです。次のリチウムサイクルで注目すべきなのは、最も投機的な銘柄ではなく、拡張可能な生産能力、資金調達余力、運営規律、戦略的重要性を持つ企業です。"],
      ["エントリー規律", "構造的テーマが正しくても、価格がリターンを決めます。短期資金が退き、バリュエーションがリセットされ、センチメントが疲弊した時、長期機会はより明確になります。リチウムは EV 成長株の取引から、戦略素材サイクルへ移行しつつあります。"],
    ],
    ko: [
      ["전기차 내러티브만은 아니다", "이전 리튬 사이클은 전기차 내러티브와 모멘텀 자금의 영향을 크게 받았습니다. EV 기대가 높아지면 리튬 가격과 관련 주식이 상승했고, 기대가 약해지면 투기적 기업들은 크게 하락했습니다. 다음 사이클은 EV 보급률뿐 아니라 전력망 안보, 에너지 저장, 산업 정책, 공급망 전략이 함께 형성할 가능성이 큽니다."],
      ["전략 소재 프레임워크", "에너지 저장 시스템은 리튬 수요의 두 번째 구조적 동인이 되고 있습니다. 전력망 회복력이 중요해지면서 핵심 광물은 국가 산업 정책과 공급망 안보의 일부가 되고 있습니다. 이는 변동성을 없애지는 않지만 우량 자산의 하방 리스크 구조를 바꿀 수 있습니다."],
      ["테마보다 품질", "테마 투자의 가장 큰 위험은 좋은 내러티브를 좋은 투자와 혼동하는 것입니다. 다음 리튬 사이클에서 중요한 것은 가장 투기적인 이름이 아니라 확장 가능한 생산, 자금 조달 유연성, 운영 규율, 전략적 관련성을 가진 기업입니다."],
      ["진입 규율", "구조적 테마가 맞더라도 가격이 수익률을 결정합니다. 단기 자금이 빠지고 밸류에이션이 재설정되며 심리가 소진될 때 장기 기회가 더 명확해질 수 있습니다. 리튬은 전기차 성장주 거래에서 전략 소재 사이클로 이동하고 있습니다."],
    ],
    de: [
      ["Nicht mehr nur ein EV-Narrativ", "Der vorherige Lithiumzyklus wurde stark von EV-Narrativ und Momentumkapital getrieben. Wenn die EV-Stimmung stieg, legten Lithiumpreise und zugehörige Aktien zu; wenn die Stimmung kippte, fielen spekulative Unternehmen massiv. Der nächste Zyklus dürfte jedoch nicht nur von EV-Durchdringung abhängen, sondern von Netzsicherheit, Speicherbedarf, Industriepolitik und Lieferkettenstrategie."],
      ["Ein strategischer Rohstoffrahmen", "Energiespeicher entwickeln sich zu einem zweiten strukturellen Nachfragetreiber für Lithium. Mit steigenden Anforderungen an Netzresilienz werden kritische Rohstoffe Teil von Industriepolitik und Versorgungssicherheit. Das eliminiert keine Volatilität, verändert aber das Risikoprofil hochwertiger Assets im Zyklustief."],
      ["Qualität vor Thema", "Der größte Fehler bei thematischen Investments besteht darin, ein gutes Narrativ mit einem guten Investment zu verwechseln. Im nächsten Lithiumzyklus sind vermutlich nicht die spekulativsten Namen am attraktivsten, sondern Betreiber mit skalierbarer Produktion, Finanzierungsspielraum, operativer Disziplin und strategischer Relevanz."],
      ["Einstiegsdisziplin", "Selbst bei einem starken strukturellen Thema entscheidet der Einstiegspreis über die Rendite. Wenn touristisches Kapital abfließt, Bewertungen zurückgesetzt werden und Sentiment erschöpft ist, entstehen oft klarere langfristige Chancen. Lithium entwickelt sich von einem EV-Wachstumstrade zu einem strategischen Rohstoffzyklus."],
    ],
    fr: [
      ["Plus seulement un récit véhicules électriques", "Le précédent cycle du lithium a été fortement porté par le récit des véhicules électriques et les capitaux de momentum. Lorsque l’optimisme EV montait, les prix du lithium et les actions liées progressaient ; lorsque le sentiment se retournait, les sociétés spéculatives chutaient fortement. Le prochain cycle pourrait dépendre autant de la sécurité du réseau, du stockage, de la politique industrielle et des chaînes d’approvisionnement que de l’adoption des EV."],
      ["Un cadre de matériau stratégique", "Les systèmes de stockage deviennent un deuxième moteur structurel de la demande de lithium. À mesure que la résilience du réseau électrique devient prioritaire, les minéraux critiques entrent dans les cadres de politique industrielle et de sécurité d’approvisionnement. Cela n’élimine pas la volatilité, mais modifie le profil de risque des actifs de qualité."],
      ["La qualité avant le thème", "La principale erreur de l’investissement thématique est de confondre un bon récit avec un bon investissement. Dans le prochain cycle du lithium, les opportunités les plus solides pourraient se trouver chez les opérateurs capables d’augmenter la production, de financer leur croissance, d’exécuter avec discipline et de conserver une pertinence stratégique."],
      ["Discipline d’entrée", "Même lorsqu’un thème structurel est valide, le prix d’entrée détermine le rendement. Lorsque le capital opportuniste sort, que les valorisations se réinitialisent et que le sentiment s’épuise, les opportunités de long terme deviennent plus lisibles. Le lithium évolue d’un simple trade EV vers un cycle de matériau stratégique."],
    ],
  },
};

const articleLabels = {
  "zh-hant": {
    scope: "研究範圍",
    map: "框架地圖",
    thesis: "核心論點",
    data: "需要追蹤的數據",
    risks: "觀點風險",
    final: "最後思考",
    related: "相關研究",
    sources: "參考來源",
    disclaimerTitle: "免責聲明",
  },
  ja: {
    scope: "リサーチ範囲",
    map: "フレームワーク・マップ",
    thesis: "中核仮説",
    data: "注目すべきデータ",
    risks: "見方に対するリスク",
    final: "最後に",
    related: "関連リサーチ",
    sources: "参考資料",
    disclaimerTitle: "免責事項",
  },
  ko: {
    scope: "리서치 범위",
    map: "프레임워크 맵",
    thesis: "핵심 논지",
    data: "확인할 주요 데이터",
    risks: "관점에 대한 리스크",
    final: "마지막 생각",
    related: "관련 리서치",
    sources: "참고 자료",
    disclaimerTitle: "면책 고지",
  },
  de: {
    scope: "Research Scope",
    map: "Framework Map",
    thesis: "Kernthese",
    data: "Wichtige Datenpunkte",
    risks: "Risiken der Sichtweise",
    final: "Abschließender Gedanke",
    related: "Verwandtes Research",
    sources: "Ausgewählte Quellen",
    disclaimerTitle: "Disclaimer",
  },
  fr: {
    scope: "Périmètre de recherche",
    map: "Carte du cadre d’analyse",
    thesis: "Thèse centrale",
    data: "Données à suivre",
    risks: "Risques pour la thèse",
    final: "Conclusion",
    related: "Recherches liées",
    sources: "Sources sélectionnées",
    disclaimerTitle: "Avertissement",
  },
};

function languageMenu(langKey, currentHref) {
  const items = [
    ["en", "English", currentHref.en],
    ["zh-CN", "简体中文", currentHref.zh],
    ["zh-Hant", "繁體中文", currentHref["zh-hant"]],
    ["ja", "日本語", currentHref.ja],
    ["ko", "한국어", currentHref.ko],
    ["de", "Deutsch", currentHref.de],
    ["fr", "Français", currentHref.fr],
  ];
  return `<details class="language-switch">
        <summary aria-label="Language selector"><span>${languages[langKey].current}</span></summary>
        <div class="language-menu" role="listbox" aria-label="Language options">
${items.map(([code, label, href]) => `          <a${code === languages[langKey].htmlLang ? " class=\"is-active\"" : ""} href="${href}" lang="${code}">${label}</a>`).join("\n")}
        </div>
      </details>`;
}

function header(langKey, active = "home", currentHref = {}) {
  const l = languages[langKey];
  const nav = [
    [l.nav[0], l.home],
    [l.nav[1], l.methodology],
    [l.nav[2], `${l.home}#research-library`],
    [l.nav[3], l.articles],
    [l.nav[4], l.themes],
    [l.nav[5], l.methodology],
    [l.nav[6], `${l.home}#about`],
  ];
  return `<header class="site-header">
      <a class="brand" href="${l.home}" aria-label="Policy Alpha Research home">
        <span class="brand-mark" aria-hidden="true"><img src="assets/policy-alpha-logo.png" alt="" /></span>
        <span><strong>Policy Alpha</strong><small>${l.brandSmall}</small><small>Elena Zhang</small></span>
      </a>
      <nav class="nav" aria-label="Primary navigation">
${nav.map(([text, href]) => `        <a${active === text ? " aria-current=\"page\"" : ""} href="${href}">${text}</a>`).join("\n")}
      </nav>
      ${languageMenu(langKey, currentHref)}
    </header>`;
}

function head(langKey, title, description, url) {
  const l = languages[langKey];
  return `<!doctype html>
<html lang="${l.htmlLang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="https://policyalpharesearch.com/${url}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="assets/app-icon-180.png" />
    <link rel="manifest" href="site.webmanifest" />
    <meta name="theme-color" content="#07090b" />
    <link rel="stylesheet" href="styles.css?v=${version}" />
  </head>`;
}

function footer(langKey) {
  const l = languages[langKey];
  return `<footer class="site-footer">
      <div class="footer-identity"><strong>Policy Alpha Research</strong><span>${l.brandSmall}</span></div>
      <div class="footer-contact"><span>${l.contact}</span><a href="mailto:elenazhang2378@outlook.com">elenazhang2378@outlook.com</a></div>
      <span class="footer-copyright">© 2026 Policy Alpha Research · Elena Zhang</span>
    </footer>
    <script src="script.js?v=${version}"></script>`;
}

function homePage(langKey) {
  const l = languages[langKey];
  const hrefs = buildHrefMap("home");
  return `${head(langKey, l.title, l.description, l.home)}
  <body>
    ${header(langKey, "home", hrefs)}
    <main id="top">
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${l.heroEyebrow}</p>
          <h1>${l.heroTitle}</h1>
          <p class="hero-lead">${l.heroLead}</p>
          <div class="hero-actions">
            <a class="button primary" href="${l.articles}">${l.archiveTitle}</a>
            <a class="button secondary" href="${l.themes}">${l.focusTitle}</a>
            <button class="hero-save-action save-site-button" type="button" data-save-url="https://policyalpharesearch.com/${l.home}"><span aria-hidden="true">+</span>${l.save}</button>
          </div>
        </div>
        <div class="market-terminal">
          <div class="terminal-top"><span>POLICY ALPHA MODEL · 2026</span><strong>${l.coming}</strong></div>
          <div class="metric-grid">
            <div><span>${l.frameworkSteps[0]}</span><strong>Policy</strong></div>
            <div><span>${l.frameworkSteps[1]}</span><strong>Sector</strong></div>
            <div><span>${l.frameworkSteps[2]}</span><strong>Market</strong></div>
            <div><span>${l.frameworkSteps[3]}</span><strong>Positioning</strong></div>
          </div>
        </div>
      </section>
      <section class="section process-section" id="framework">
        <div class="section-heading"><p class="eyebrow">${l.frameworkTitle}</p><h2>${l.frameworkTitle}</h2><p>${l.methodologyLead}</p></div>
        <div class="process-grid">
${l.frameworkSteps.map((step, i) => `<article class="process-card"><span class="step">0${i + 1}</span><h3>${step}</h3><p>${l.methodologyLead}</p></article>`).join("\n")}
        </div>
      </section>
      <section class="section allocation-section">
        <div class="section-heading"><p class="eyebrow">${l.focusTitle}</p><h2>${l.focusTitle}</h2></div>
        <div class="pill-list">${l.focus.map((item) => `<span>${item}</span>`).join("")}</div>
      </section>
      <section class="section insights-section" id="insights">
        <div class="section-heading"><p class="eyebrow">${l.archiveTitle}</p><h2>${l.archiveTitle}</h2><p>${l.archiveLead}</p></div>
        <div class="insight-grid">${articleBase.map((a) => insightCard(langKey, a)).join("")}</div>
      </section>
      <section class="section about-section" id="about">
        <div class="section-heading"><p class="eyebrow">Policy Alpha Research</p><h2>${l.aboutTitle}</h2><p>${l.about}</p></div>
        <div class="article-disclaimer"><p>${l.disclaimer}</p></div>
      </section>
    </main>
    ${footer(langKey)}
  </body>
</html>`;
}

function insightCard(langKey, article) {
  const l = languages[langKey];
  return `<article class="insight-card featured-insight">
          <span class="research-badge">${researchBadge(langKey)}</span>
          <div class="insight-meta"><span>${articleSeries(langKey, article)}</span><strong>${dateLabel(langKey)}</strong></div>
          <h3>${articleTitle(langKey, article)}</h3>
          <p>${article.decks[langKey]}</p>
          <div class="thesis-preview">${thesisPreview(langKey, article)}</div>
          <div class="theme-tags" aria-label="Connected themes">${articleThemeTags(langKey, article).map((item) => `<span>${item}</span>`).join("")}</div>
          <a class="button primary" href="articles/${langKey}-${article.slug}.html">${l.read}</a>
        </article>`;
}

function articlesPage(langKey) {
  const l = languages[langKey];
  return `${head(langKey, `${l.archiveTitle} | Policy Alpha Research`, l.archiveLead, l.articles)}
  <body>
    ${header(langKey, "articles", buildHrefMap("articles"))}
    <main id="top">
      <section class="section insights-section article-index">
        <div class="section-heading"><p class="eyebrow">Policy Alpha Insights</p><h1>${l.archiveTitle}</h1><p>${l.archiveLead}</p></div>
        <div class="insight-grid">${articleBase.map((a) => insightCard(langKey, a)).join("")}</div>
      </section>
    </main>
    ${footer(langKey)}
  </body>
</html>`;
}

function themesPage(langKey) {
  const l = languages[langKey];
  return `${head(langKey, `${l.themesTitle} | Policy Alpha Research`, l.description, l.themes)}
  <body>
    ${header(langKey, "themes", buildHrefMap("themes"))}
    <main id="top">
      <section class="section methodology-hero">
        <div class="section-heading"><p class="eyebrow">${l.focusTitle}</p><h1>${l.themesTitle}</h1><p>${l.heroLead}</p></div>
        <div class="methodology-grid">${l.focus.map((item, i) => `<article><span>0${i + 1}</span><h2>${item}</h2><p>${l.methodologyLead}</p></article>`).join("")}</div>
      </section>
    </main>
    ${footer(langKey)}
  </body>
</html>`;
}

function methodologyPage(langKey) {
  const l = languages[langKey];
  return `${head(langKey, `${l.methodologyTitle} | Policy Alpha Research`, l.methodologyLead, l.methodology)}
  <body>
    ${header(langKey, "methodology", buildHrefMap("methodology"))}
    <main id="top">
      <section class="section methodology-hero">
        <div class="section-heading"><p class="eyebrow">${l.frameworkTitle}</p><h1>${l.methodologyTitle}</h1><p>${l.methodologyLead}</p></div>
        <div class="methodology-grid">${l.frameworkSteps.map((step, i) => `<article><span>0${i + 1}</span><h2>${step}</h2><p>${l.methodologyLead}</p></article>`).join("")}</div>
      </section>
      <section class="section methodology-disclosure"><h2>Disclosure</h2><p>${l.disclaimer}</p></section>
    </main>
    ${footer(langKey)}
  </body>
</html>`;
}

function articlePage(langKey, article) {
  const l = languages[langKey];
  const labels = articleLabels[langKey];
  const fileName = `${langKey}-${article.slug}.html`;
  const sections = articleBody[article.slug][langKey];
  return `${head(langKey, `${articleTitle(langKey, article)} | Policy Alpha Research`, article.decks[langKey], `articles/${fileName}`).replace('href="styles.css', 'href="../styles.css').replace('href="assets/', 'href="../assets/').replace('href="site.webmanifest', 'href="../site.webmanifest')}
  <body>
    ${articleHeader(langKey, article)}
    <main id="top">
      <article class="article-shell">
        <header class="article-hero">
          <p class="eyebrow">Policy Alpha Insights</p>
          <p class="series-kicker">${articleSeries(langKey, article)}</p>
          <h1>${articleTitle(langKey, article)}</h1>
          <div class="article-meta-line"><span>Policy Alpha Research</span><span>Elena Zhang</span><span>${dateLabel(langKey)}</span></div>
          <p class="article-dek">${article.decks[langKey]}</p>
        </header>
        <section class="article-summary">
          <h2>${summaryLabel(langKey)}</h2>
          <ul>${article.bullets[langKey].map((item) => `<li>${item}</li>`).join("")}</ul>
        </section>
        <section class="article-summary research-note-panel">
          <h2>${labels.scope}</h2>
          <p>${article.decks[langKey]}</p>
        </section>
        <section class="article-summary">
          <h2>${labels.map}</h2>
          <div class="framework-map">${articleFramework(langKey, article)}</div>
        </section>
        <section class="article-summary research-note-panel">
          <h2>${labels.thesis}</h2>
          <p>${sections[0][1]}</p>
        </section>
        <section class="article-content">
          ${completeArticleBody(langKey, article)}
        </section>
        <section class="article-summary">
          <h2>${labels.data}</h2>
          <ul>${articleDataPoints(langKey, article)}</ul>
        </section>
        <section class="article-summary">
          <h2>${labels.risks}</h2>
          <ul>${articleRisks(langKey, article)}</ul>
        </section>
        <section class="article-summary research-note-panel">
          <h2>${labels.final}</h2>
          <p>${sections[sections.length - 1][1]}</p>
        </section>
        <section class="article-footer-note">
          <h2>${labels.related}</h2>
          <ul>${relatedResearch(langKey, article)}</ul>
        </section>
        <section class="article-connected-themes">
          <h2>${connectedThemesLabel(langKey)}</h2>
          <div class="connected-themes">${articleThemeTags(langKey, article).map((item) => `<a href="../${l.themes}">${item}</a>`).join("")}</div>
        </section>
        <section class="article-references">
          <h2>${labels.sources}</h2>
          <ul>
            <li><a href="https://policyalpharesearch.com/articles/${article.slug}.html">Policy Alpha Research original English note</a></li>
            <li><a href="https://policyalpharesearch.com/articles/zh-${article.slug}.html">Policy Alpha Research simplified Chinese note</a></li>
          </ul>
        </section>
        <section class="article-disclaimer">
          <h2>${labels.disclaimerTitle}</h2>
          <p>${l.disclaimer}</p>
        </section>
      </article>
    </main>
    ${footer(langKey).replace('src="script.js', 'src="../script.js')}
  </body>
</html>`;
}

function completeArticleBody(langKey, article) {
  const sourceFile = langKey === "zh-hant"
    ? `zh-${article.slug}.html`
    : `${article.slug}.html`;
  const raw = extractMainBody(sourceFile);
  if (langKey === "zh-hant") {
    return toTraditionalChinese(raw);
  }
  const intro = {
    ja: "以下は情報の完全性を保つため、英語原文の本文をそのまま掲載しています。翻訳版の要約と合わせて参照してください。",
    ko: "아래 본문은 정보의 완전성을 위해 영어 원문 전문을 함께 제공합니다. 위의 현지어 요약과 함께 참고하십시오.",
    de: "Zur Wahrung der inhaltlichen Vollständigkeit folgt unten der vollständige englische Originaltext. Bitte lesen Sie ihn zusammen mit der übersetzten Zusammenfassung.",
    fr: "Pour préserver l’intégralité du contenu, le texte complet original en anglais est fourni ci-dessous, à lire avec la synthèse traduite.",
  }[langKey];
  return `<div class="research-note-panel"><p>${intro}</p></div>
          ${raw}`;
}

function extractMainBody(fileName) {
  const html = readFileSync(path.join(root, "articles", fileName), "utf8");
  const match = html.match(/<section class="article-body">([\s\S]*?)<\/section>/);
  if (!match) {
    throw new Error(`Unable to extract article body from ${fileName}`);
  }
  return match[1].trim();
}

function toTraditionalChinese(html) {
  const replacements = [
    ["价值观", "價值觀"],
    ["价值", "價值"],
    ["资本", "資本"],
    ["市场", "市場"],
    ["准入", "准入"],
    ["过滤", "過濾"],
    ["机制", "機制"],
    ["结构", "結構"],
    ["投资", "投資"],
    ["组合", "組合"],
    ["企业", "企業"],
    ["供应链", "供應鏈"],
    ["供应商", "供應商"],
    ["融资", "融資"],
    ["成本", "成本"],
    ["机构", "機構"],
    ["持仓", "持倉"],
    ["长期", "長期"],
    ["估值", "估值"],
    ["即将", "即將"],
    ["挤压", "擠壓"],
    ["不对称", "不對稱"],
    ["负担", "負擔"],
    ["它们", "它們"],
    ["足够", "足夠"],
    ["规模", "規模"],
    ["轻松", "輕鬆"],
    ["合规", "合規"],
    ["体系", "體系"],
    ["完整", "完整"],
    ["问题", "問題"],
    ["讨论", "討論"],
    ["认为", "認為"],
    ["虽然", "雖然"],
    ["但是", "但是"],
    ["通过", "透過"],
    ["实现", "實現"],
    ["调整", "調整"],
    ["变成", "變成"],
    ["这种", "這種"],
    ["这些", "這些"],
    ["这里", "這裡"],
    ["这个", "這個"],
    ["不是", "不是"],
    ["对", "對"],
    ["开", "開"],
    ["会", "會"],
    ["与", "與"],
    ["为", "為"],
    ["来", "來"],
    ["监管", "監管"],
    ["规则", "規則"],
    ["披露", "披露"],
    ["数据", "數據"],
    ["运营", "營運"],
    ["经营", "經營"],
    ["基础设施", "基礎設施"],
    ["政策", "政策"],
    ["欧盟", "歐盟"],
    ["绿色", "綠色"],
    ["债券", "債券"],
    ["标准", "標準"],
    ["范围", "範圍"],
    ["公司", "公司"],
    ["影响", "影響"],
    ["要求", "要求"],
    ["国际", "國際"],
    ["跨境", "跨境"],
    ["参与", "參與"],
    ["阶段", "階段"],
    ["正在", "正在"],
    ["成为", "成為"],
    ["转向", "轉向"],
    ["筛选", "篩選"],
    ["分化", "分化"],
    ["风险", "風險"],
    ["执行", "執行"],
    ["进行", "進行"],
    ["行业", "行業"],
    ["产业", "產業"],
    ["财务", "財務"],
    ["现金流", "現金流"],
    ["竞争", "競爭"],
    ["客户", "客戶"],
    ["采购", "採購"],
    ["关系", "關係"],
    ["质量", "質量"],
    ["选择", "選擇"],
    ["进入", "進入"],
    ["超过", "超過"],
    ["风险", "風險"],
    ["观点", "觀點"],
    ["叙事", "敘事"],
    ["电动车", "電動車"],
    ["电网", "電網"],
    ["智能体", "智能體"],
    ["计算", "計算"],
    ["网络", "網路"],
    ["资料", "資料"],
    ["能源", "能源"],
    ["锂", "鋰"],
  ];
  return replacements.reduce((text, [from, to]) => text.replaceAll(from, to), html);
}

function articleHeader(langKey, article) {
  const l = languages[langKey];
  const hrefs = buildHrefMap(`article:${article.slug}`);
  const nav = [
    [l.nav[0], `../${l.home}`],
    [l.nav[3], `../${l.articles}`],
    [l.nav[4], `../${l.themes}`],
    [l.nav[5], `../${l.methodology}`],
  ];
  const menuHrefs = Object.fromEntries(Object.entries(hrefs).map(([k, v]) => [k, k === "en" || k === "zh" ? v : `../${v}`]));
  menuHrefs.en = article.slug + ".html";
  menuHrefs.zh = `zh-${article.slug}.html`;
  menuHrefs["zh-hant"] = `zh-hant-${article.slug}.html`;
  menuHrefs.ja = `ja-${article.slug}.html`;
  menuHrefs.ko = `ko-${article.slug}.html`;
  menuHrefs.de = `de-${article.slug}.html`;
  menuHrefs.fr = `fr-${article.slug}.html`;
  return `<header class="site-header">
      <a class="brand" href="../${l.home}" aria-label="Policy Alpha Research home">
        <span class="brand-mark" aria-hidden="true"><img src="../assets/policy-alpha-logo.png" alt="" /></span>
        <span><strong>Policy Alpha</strong><small>${l.brandSmall}</small><small>Elena Zhang</small></span>
      </a>
      <nav class="nav" aria-label="Primary navigation">${nav.map(([text, href]) => `<a href="${href}">${text}</a>`).join("")}</nav>
      ${languageMenu(langKey, menuHrefs)}
    </header>`;
}

function buildHrefMap(type) {
  if (type === "home") return { en: "/", zh: "zh.html", "zh-hant": "zh-hant.html", ja: "ja.html", ko: "ko.html", de: "de.html", fr: "fr.html" };
  if (type === "articles") return { en: "articles.html", zh: "zh-articles.html", "zh-hant": "zh-hant-articles.html", ja: "ja-articles.html", ko: "ko-articles.html", de: "de-articles.html", fr: "fr-articles.html" };
  if (type === "themes") return { en: "themes.html", zh: "zh-themes.html", "zh-hant": "zh-hant-themes.html", ja: "ja-themes.html", ko: "ko-themes.html", de: "de-themes.html", fr: "fr-themes.html" };
  if (type === "methodology") return { en: "methodology.html", zh: "zh-methodology.html", "zh-hant": "zh-hant-methodology.html", ja: "ja-methodology.html", ko: "ko-methodology.html", de: "de-methodology.html", fr: "fr-methodology.html" };
  const slug = type.split(":")[1];
  return { en: `articles/${slug}.html`, zh: `articles/zh-${slug}.html`, "zh-hant": `articles/zh-hant-${slug}.html`, ja: `articles/ja-${slug}.html`, ko: `articles/ko-${slug}.html`, de: `articles/de-${slug}.html`, fr: `articles/fr-${slug}.html` };
}

function articleTitle(langKey, article) {
  if (langKey === "zh-hant") return article.zh
    .replaceAll("价值观", "價值觀")
    .replaceAll("价值", "價值")
    .replaceAll("资本", "資本")
    .replaceAll("过滤器", "過濾器")
    .replaceAll("成为", "成為")
    .replaceAll("电动车", "電動車")
    .replaceAll("下一场", "下一場")
    .replaceAll("竞赛", "競賽")
    .replaceAll("属于", "屬於")
    .replaceAll("聪明", "聰明")
    .replaceAll("锂", "鋰");
  if (langKey === "ja") {
    if (article.slug.startsWith("esg")) return "ESG はもはや価値観の枠組みではなく、資本アクセスのフィルターである";
    if (article.slug.startsWith("the-next-ai")) return "次の AI 競争は最も賢いモデルだけでは勝てない";
    return "リチウムはもはや EV 取引だけではない";
  }
  if (langKey === "ko") {
    if (article.slug.startsWith("esg")) return "ESG는 더 이상 가치 프레임워크가 아니라 자본 접근 필터입니다";
    if (article.slug.startsWith("the-next-ai")) return "다음 AI 경쟁은 가장 똑똑한 모델만으로 이길 수 없습니다";
    return "리튬은 더 이상 전기차 거래만이 아닙니다";
  }
  if (langKey === "de") {
    if (article.slug.startsWith("esg")) return "ESG ist kein Werte-Framework mehr. Es ist ein Kapitalzugangsfilter.";
    if (article.slug.startsWith("the-next-ai")) return "Das nächste KI-Rennen gewinnt nicht das intelligenteste Modell";
    return "Lithium ist nicht mehr nur ein EV-Trade";
  }
  if (langKey === "fr") {
    if (article.slug.startsWith("esg")) return "L’ESG n’est plus un cadre de valeurs. C’est un filtre d’accès au capital.";
    if (article.slug.startsWith("the-next-ai")) return "La prochaine course à l’IA ne sera pas gagnée par le modèle le plus intelligent";
    return "Le lithium n’est plus seulement un thème véhicules électriques";
  }
  return article.en;
}

function articleSeries(langKey, article) {
  const seriesMap = {
    "ESG & Capital Markets Series": {
      "zh-hant": "ESG 與資本市場系列",
      ja: "ESG・資本市場シリーズ",
      ko: "ESG 및 자본시장 시리즈",
      de: "ESG- und Kapitalmarktserie",
      fr: "Série ESG et marchés de capitaux",
    },
    "AI Infrastructure Series": {
      "zh-hant": "AI 基礎設施系列",
      ja: "AI インフラシリーズ",
      ko: "AI 인프라 시리즈",
      de: "KI-Infrastrukturserie",
      fr: "Série infrastructure IA",
    },
    "Critical Minerals Series": {
      "zh-hant": "關鍵礦產系列",
      ja: "重要鉱物シリーズ",
      ko: "핵심 광물 시리즈",
      de: "Serie kritische Rohstoffe",
      fr: "Série minéraux critiques",
    },
  };
  return seriesMap[article.series]?.[langKey] || article.series;
}

function researchBadge(langKey) {
  return ({
    "zh-hant": "研究札記",
    ja: "リサーチノート",
    ko: "리서치 노트",
    de: "Research Note",
    fr: "Note de recherche",
  })[langKey] || "Research Note";
}

function connectedThemesLabel(langKey) {
  return ({
    "zh-hant": "關聯主題",
    ja: "関連テーマ",
    ko: "연결된 테마",
    de: "Verbundene Themen",
    fr: "Thèmes liés",
  })[langKey] || "Connected Themes";
}

function thesisPreview(langKey, article) {
  const previews = {
    "esg-is-no-longer-a-values-framework": {
      "zh-hant": "核心判斷：ESG 正從價值觀語言轉向資本准入與供應鏈兼容性過濾器。",
      ja: "Short thesis: ESG is moving from values language into a capital access and supply-chain compatibility filter.",
      ko: "Short thesis: ESG is moving from values language into a capital access and supply-chain compatibility filter.",
      de: "Short thesis: ESG is moving from values language into a capital access and supply-chain compatibility filter.",
      fr: "Short thesis: ESG is moving from values language into a capital access and supply-chain compatibility filter.",
    },
    "the-next-ai-race-wont-be-won-by-the-smartest-model": {
      "zh-hant": "核心判斷：下一輪 AI 瓶頸可能在執行基礎設施，而不只在模型智能。",
      ja: "Short thesis: the next AI bottleneck may sit in execution infrastructure rather than model intelligence alone.",
      ko: "Short thesis: the next AI bottleneck may sit in execution infrastructure rather than model intelligence alone.",
      de: "Short thesis: the next AI bottleneck may sit in execution infrastructure rather than model intelligence alone.",
      fr: "Short thesis: the next AI bottleneck may sit in execution infrastructure rather than model intelligence alone.",
    },
    "lithium-is-no-longer-just-an-ev-trade": {
      "zh-hant": "核心判斷：鋰正在從電動車代理變量，轉向戰略材料與電網安全主題。",
      ja: "Short thesis: lithium is being repriced as a strategic materials theme, not only an EV adoption proxy.",
      ko: "Short thesis: lithium is being repriced as a strategic materials theme, not only an EV adoption proxy.",
      de: "Short thesis: lithium is being repriced as a strategic materials theme, not only an EV adoption proxy.",
      fr: "Short thesis: lithium is being repriced as a strategic materials theme, not only an EV adoption proxy.",
    },
  };
  return previews[article.slug]?.[langKey] || article.decks[langKey];
}

function articleThemeTags(langKey, article) {
  const tags = {
    "esg-is-no-longer-a-values-framework": {
      "zh-hant": ["ESG", "資本准入", "供應鏈", "監管"],
      ja: ["ESG", "Capital Access", "Supply Chains", "Regulation"],
      ko: ["ESG", "Capital Access", "Supply Chains", "Regulation"],
      de: ["ESG", "Capital Access", "Supply Chains", "Regulation"],
      fr: ["ESG", "Capital Access", "Supply Chains", "Regulation"],
    },
    "the-next-ai-race-wont-be-won-by-the-smartest-model": {
      "zh-hant": ["AI 基礎設施", "算力", "電力需求", "企業系統"],
      ja: ["AI Infrastructure", "Compute", "Power Demand", "Enterprise Systems"],
      ko: ["AI Infrastructure", "Compute", "Power Demand", "Enterprise Systems"],
      de: ["AI Infrastructure", "Compute", "Power Demand", "Enterprise Systems"],
      fr: ["AI Infrastructure", "Compute", "Power Demand", "Enterprise Systems"],
    },
    "lithium-is-no-longer-just-an-ev-trade": {
      "zh-hant": ["關鍵礦產", "鋰", "電網安全", "產業政策"],
      ja: ["Critical Minerals", "Lithium", "Grid Security", "Industrial Policy"],
      ko: ["Critical Minerals", "Lithium", "Grid Security", "Industrial Policy"],
      de: ["Critical Minerals", "Lithium", "Grid Security", "Industrial Policy"],
      fr: ["Critical Minerals", "Lithium", "Grid Security", "Industrial Policy"],
    },
  };
  return tags[article.slug]?.[langKey] || [];
}

function dateLabel(langKey) {
  return ({
    "zh-hant": "2026 年 5 月",
    ja: "2026年5月",
    ko: "2026년 5월",
    de: "Mai 2026",
    fr: "Mai 2026",
  })[langKey] || "May 2026";
}

function summaryLabel(langKey) {
  return ({ "zh-hant": "核心要點", ja: "要点", ko: "핵심 요점", de: "Kernaussagen", fr: "Points clés" })[langKey];
}

function articleFramework(langKey, article) {
  const maps = {
    "zh-hant": ["政策與監管信號", "行業與供應鏈映射", "資本市場確認", "長期組合含義"],
    ja: ["政策・規制シグナル", "セクターと供給網のマッピング", "資本市場による確認", "長期ポートフォリオへの示唆"],
    ko: ["정책 및 규제 신호", "섹터와 공급망 매핑", "자본시장 확인", "장기 포트폴리오 시사점"],
    de: ["Politik- und Regulierungssignal", "Sektor- und Lieferketten-Mapping", "Kapitalmarktbestätigung", "Langfristige Portfolioimplikation"],
    fr: ["Signal politique et réglementaire", "Cartographie sectorielle et chaîne d’approvisionnement", "Confirmation par les marchés de capitaux", "Implications de portefeuille à long terme"],
  };
  return maps[langKey].map((item, index) => `<span>${index + 1}. ${item}</span>`).join("");
}

function articleDataPoints(langKey, article) {
  const bySlug = {
    "esg-is-no-longer-a-values-framework": {
      "zh-hant": ["CSRD 覆蓋範圍與供應商披露要求", "CBAM 行業成本與碳價格變化", "綠色債券與永續貸款利差", "機構持倉與 ESG 排除名單變化"],
      ja: ["CSRD の対象範囲とサプライヤー開示要求", "CBAM 対象セクターのコストと炭素価格", "グリーンボンドとサステナビリティ連動ローンのスプレッド", "機関投資家の保有と ESG 除外リストの変化"],
      ko: ["CSRD 적용 범위와 공급업체 공시 요구", "CBAM 대상 산업 비용과 탄소 가격", "그린본드 및 지속가능성 연계 대출 스프레드", "기관 보유와 ESG 제외 목록 변화"],
      de: ["CSRD-Abdeckung und Lieferantendatenanforderungen", "CBAM-Kosten und CO2-Preise in betroffenen Sektoren", "Spreads von Green Bonds und Sustainability-Linked Loans", "Institutionelle Beteiligungen und ESG-Ausschlusslisten"],
      fr: ["Périmètre CSRD et exigences de données fournisseurs", "Coûts CBAM et prix du carbone dans les secteurs concernés", "Spreads des obligations vertes et prêts liés à la durabilité", "Détention institutionnelle et listes d’exclusion ESG"],
    },
    "the-next-ai-race-wont-be-won-by-the-smartest-model": {
      "zh-hant": ["推理算力需求與 GPU 利用率", "資料中心電力負載與電網連接時間", "企業自動化工作流採用率", "網安、記憶體、網路與雲端資本開支"],
      ja: ["推論計算需要と GPU 利用率", "データセンター電力負荷と系統接続期間", "企業の自動化ワークフロー採用率", "サイバーセキュリティ、メモリ、ネットワーク、クラウド投資"],
      ko: ["추론 컴퓨팅 수요와 GPU 활용률", "데이터센터 전력 부하와 전력망 연결 기간", "기업 자동화 워크플로 채택률", "사이버보안, 메모리, 네트워크, 클라우드 투자"],
      de: ["Inferenz-Compute-Nachfrage und GPU-Auslastung", "Rechenzentrumsstromlast und Netzanschlusszeiten", "Adoption von Automatisierungs-Workflows in Unternehmen", "Cybersecurity, Speicher, Netzwerke und Cloud-Capex"],
      fr: ["Demande d’inférence et taux d’utilisation GPU", "Charge électrique des centres de données et délais de connexion au réseau", "Adoption des workflows d’automatisation en entreprise", "Cybersécurité, mémoire, réseaux et investissements cloud"],
    },
    "lithium-is-no-longer-just-an-ev-trade": {
      "zh-hant": ["碳酸鋰與氫氧化鋰價格", "儲能裝機與電網投資", "關鍵礦產政策與戰略儲備", "礦企資本開支、現金成本與融資能力"],
      ja: ["炭酸リチウムと水酸化リチウムの価格", "蓄電導入量と電力網投資", "重要鉱物政策と戦略備蓄", "鉱山会社の設備投資、キャッシュコスト、資金調達力"],
      ko: ["탄산리튬 및 수산화리튬 가격", "에너지 저장 설치량과 전력망 투자", "핵심 광물 정책과 전략 비축", "광산 기업의 자본 지출, 현금 비용, 자금 조달 능력"],
      de: ["Preise für Lithiumcarbonat und Lithiumhydroxid", "Speicherzubau und Netzinvestitionen", "Politik zu kritischen Rohstoffen und strategische Reserven", "Capex, Cash Costs und Finanzierungskraft der Produzenten"],
      fr: ["Prix du carbonate et de l’hydroxyde de lithium", "Déploiement du stockage et investissements réseau", "Politiques sur les minéraux critiques et réserves stratégiques", "Capex, coûts cash et capacité de financement des producteurs"],
    },
  };
  return bySlug[article.slug][langKey].map((item) => `<li>${item}</li>`).join("");
}

function articleSupplementalSections(langKey, article) {
  const text = {
    "zh-hant": {
      market: ["市場含義", `${article.decks[langKey]} 對市場而言，關鍵不只是主題本身，而是資本是否開始把它納入更長週期的定價框架。當政策、需求、供應鏈和資本成本同時指向同一方向時，市場敘事往往會從短期交易轉為結構性配置。`],
      portfolio: ["組合含義", "在組合層面，這類主題不應被當作單一事件交易，而應根據估值、質量、資金流與風險預算分層處理。研究重點是找到具備長期競爭力、資產負債表韌性和政策相關性的公司，而不是追逐最熱門的短期標的。"],
      watch: ["政策觀察", "需要持續觀察財政支持、監管口徑、產業補貼、跨境限制、供應鏈安全和機構資本配置變化。政策方向不必每天變化，但當政策語境逐步轉向結構性支持時，資本市場往往會重新評估相關行業。"],
      discipline: ["研究紀律", "即使長期主題成立，入場價格、倉位大小和風險控制仍然決定最終回報。Policy Alpha 的研究框架強調先建立邏輯，再等待市場確認，避免把宏大敘事誤判為立即買入信號。"],
    },
    ja: {
      market: ["市場への含意", `${article.decks[langKey]} 市場にとって重要なのはテーマそのものだけではなく、資本がそれをより長いサイクルの価格形成に組み込み始めるかどうかです。政策、需要、供給網、資本コストが同じ方向を向くと、ナラティブは短期取引から構造的な資産配分へ移行しやすくなります。`],
      portfolio: ["ポートフォリオへの含意", "ポートフォリオでは、この種のテーマを単発イベントとして扱うべきではありません。バリュエーション、企業品質、資金フロー、リスク予算に分解して考える必要があります。注目すべきは、長期競争力、財務耐久性、政策との関連性を持つ企業です。"],
      watch: ["政策ウォッチ", "財政支援、規制の方向性、産業補助金、越境制限、供給網の安全保障、機関投資家の資金配分を継続的に確認する必要があります。政策は毎日変化する必要はありませんが、構造的支援へ語調が移る時、市場は関連セクターを再評価します。"],
      discipline: ["リサーチ規律", "長期テーマが正しくても、エントリー価格、ポジションサイズ、リスク管理が最終リターンを決めます。Policy Alpha の枠組みは、まず投資ロジックを定義し、その後に市場確認を待つことを重視します。"],
    },
    ko: {
      market: ["시장 시사점", `${article.decks[langKey]} 시장에서 중요한 것은 테마 자체만이 아니라 자본이 이를 더 긴 사이클의 가격 결정 프레임에 반영하기 시작하는지입니다. 정책, 수요, 공급망, 자본 비용이 같은 방향을 가리킬 때 단기 거래 내러티브는 구조적 배분 테마로 전환될 수 있습니다.`],
      portfolio: ["포트폴리오 시사점", "포트폴리오 관점에서 이런 테마는 단일 이벤트 거래가 아니라 밸류에이션, 기업 퀄리티, 자금 흐름, 리스크 예산으로 나누어 접근해야 합니다. 핵심은 장기 경쟁력, 재무 회복력, 정책 관련성을 가진 기업을 찾는 것입니다."],
      watch: ["정책 관찰", "재정 지원, 규제 방향, 산업 보조금, 국경 간 제한, 공급망 안보, 기관 자금 배분 변화를 지속적으로 봐야 합니다. 정책이 매일 바뀔 필요는 없지만 구조적 지원 쪽으로 언어가 바뀌면 시장은 관련 섹터를 재평가할 수 있습니다."],
      discipline: ["리서치 규율", "장기 테마가 맞더라도 진입 가격, 포지션 크기, 리스크 관리가 최종 수익률을 결정합니다. Policy Alpha 프레임워크는 먼저 논리를 정리하고 이후 시장 확인을 기다리는 접근을 강조합니다."],
    },
    de: {
      market: ["Marktimplikationen", `${article.decks[langKey]} Für den Markt zählt nicht nur das Thema selbst, sondern ob Kapital beginnt, es in einen längerfristigen Bewertungsrahmen einzupreisen. Wenn Politik, Nachfrage, Lieferketten und Kapitalkosten in dieselbe Richtung weisen, kann sich ein kurzfristiges Narrativ zu einer strukturellen Allokation entwickeln.`],
      portfolio: ["Portfolioimplikationen", "Auf Portfolioebene sollte ein solches Thema nicht als einzelner Ereignistrade behandelt werden. Es sollte nach Bewertung, Unternehmensqualität, Kapitalflüssen und Risikobudget zerlegt werden. Entscheidend sind Unternehmen mit dauerhafter Wettbewerbsposition, Bilanzresilienz und politischer Relevanz."],
      watch: ["Policy Watch", "Zu beobachten sind fiskalische Unterstützung, Regulierung, Industrieanreize, grenzüberschreitende Beschränkungen, Lieferkettensicherheit und institutionelle Kapitalallokation. Politik muss sich nicht täglich ändern; entscheidend ist, ob sich die Sprache in Richtung struktureller Unterstützung bewegt."],
      discipline: ["Research-Disziplin", "Selbst wenn ein langfristiges Thema richtig ist, bestimmen Einstiegspreis, Positionsgröße und Risikomanagement den Ertrag. Der Policy-Alpha-Prozess verlangt zuerst eine klare These und anschließend Marktbestätigung, statt große Narrative automatisch als Kaufsignal zu behandeln."],
    },
    fr: {
      market: ["Implications de marché", `${article.decks[langKey]} Pour le marché, l’enjeu n’est pas seulement le thème lui-même, mais le moment où le capital commence à l’intégrer dans un cadre de valorisation de plus longue durée. Quand politique, demande, chaîne d’approvisionnement et coût du capital convergent, un récit de court terme peut devenir une allocation structurelle.`],
      portfolio: ["Implications de portefeuille", "Dans un portefeuille, ce type de thème ne doit pas être traité comme un simple événement. Il doit être analysé selon la valorisation, la qualité des entreprises, les flux de capitaux et le budget de risque. Les entreprises les plus pertinentes combinent position concurrentielle durable, solidité financière et pertinence politique."],
      watch: ["Suivi des politiques publiques", "Il faut suivre le soutien budgétaire, la régulation, les incitations industrielles, les restrictions transfrontalières, la sécurité des chaînes d’approvisionnement et l’allocation du capital institutionnel. Les politiques n’ont pas besoin de changer chaque jour ; le signal important est le glissement vers un soutien structurel."],
      discipline: ["Discipline de recherche", "Même lorsqu’un thème de long terme est valide, le prix d’entrée, la taille de position et la gestion du risque déterminent le rendement. Le cadre Policy Alpha privilégie une thèse claire puis une confirmation de marché, plutôt qu’une réaction automatique aux grands récits."],
    },
  };
  const sectionMap = text[langKey];
  return [sectionMap.market, sectionMap.portfolio, sectionMap.watch, sectionMap.discipline];
}

function articleRisks(langKey, article) {
  const risks = {
    "zh-hant": ["政策執行延後或監管口徑反覆", "市場已提前定價主要利好", "利率、流動性或風險偏好削弱長期主題估值"],
    ja: ["政策実行の遅れ、または規制方針の変更", "市場が主要な追い風をすでに織り込んでいる可能性", "金利、流動性、リスク選好が長期テーマの評価を圧迫する可能性"],
    ko: ["정책 집행 지연 또는 규제 방향 변화", "시장이 주요 호재를 이미 선반영했을 가능성", "금리, 유동성, 위험 선호 변화가 장기 테마 밸류에이션을 압박할 가능성"],
    de: ["Verzögerte politische Umsetzung oder wechselnde Regulierung", "Der Markt könnte zentrale Rückenwinde bereits eingepreist haben", "Zinsen, Liquidität oder Risikobereitschaft können Bewertungsmultiples belasten"],
    fr: ["Retard de mise en œuvre des politiques ou changement réglementaire", "Le marché peut avoir déjà intégré les principaux soutiens", "Taux, liquidité ou appétit pour le risque peuvent peser sur les valorisations de long terme"],
  };
  return risks[langKey].map((item) => `<li>${item}</li>`).join("");
}

function relatedResearch(langKey, article) {
  return articleBase
    .filter((item) => item.slug !== article.slug)
    .map((item) => `<li><a href="${langKey}-${item.slug}.html">${articleTitle(langKey, item)}</a></li>`)
    .join("");
}

function sectionLabel(langKey, n) {
  return ({ "zh-hant": `研究觀點 ${n}`, ja: `リサーチ視点 ${n}`, ko: `리서치 관점 ${n}`, de: `Research-Perspektive ${n}`, fr: `Angle de recherche ${n}` })[langKey];
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

await mkdir(path.join(root, "articles"), { recursive: true });

for (const langKey of Object.keys(languages)) {
  await writeFile(path.join(root, languages[langKey].home), homePage(langKey));
  await writeFile(path.join(root, languages[langKey].articles), articlesPage(langKey));
  await writeFile(path.join(root, languages[langKey].themes), themesPage(langKey));
  await writeFile(path.join(root, languages[langKey].methodology), methodologyPage(langKey));
  for (const article of articleBase) {
    await writeFile(path.join(root, "articles", `${langKey}-${article.slug}.html`), articlePage(langKey, article));
  }
}

console.log("generated multilingual temporary pages");
