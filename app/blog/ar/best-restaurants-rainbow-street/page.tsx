import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Tajawal } from "next/font/google";
import BlogTranslations from "@/app/components/blog-translations";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const URL = "https://zowar.net/blog/ar/best-restaurants-rainbow-street";
const EN_URL = "https://zowar.net/blog/best-restaurants-rainbow-street";

export const metadata: Metadata = {
  title: "أفضل مطاعم شارع الرينبو في عمّان – دليل محلي 2026",
  description:
    "وين تاكل في شارع الرينبو: من المنسف في مطعم سفرة إلى فطور شمس البلد، مساحة ميسا، نملية، وايلد جوردان، بوكس كافيه، وفلافل القدس. دليل محلي كامل.",
  alternates: {
    canonical: URL,
    languages: { en: EN_URL, ar: URL, "x-default": EN_URL },
  },
  openGraph: {
    title: "أفضل مطاعم شارع الرينبو في عمّان – دليل محلي 2026",
    description:
      "من كشك فلافل يعمل منذ 1966 إلى فيلا أردنية على قائمة World's 50 Best Discovery: دليلك للأكل في شارع الرينبو.",
    url: URL,
    locale: "ar_JO",
    type: "article",
    images: [{ url: "/images/blog/rainbow-street--blue-gate-bougainvillea.jpg", alt: "بوابة زرقاء وزهور الجهنمية في شارع الرينبو في عمّان" }],
  },
  keywords: [
    "مطاعم شارع الرينبو",
    "أفضل مطاعم عمان",
    "شارع الرينبو عمان",
    "مطعم سفرة عمان",
    "منسف عمان",
    "شمس البلد",
    "رمان كوليكتيف",
    "فلافل القدس",
    "مطاعم جبل عمان",
    "وين أكل في عمان",
    "مطاعم أردنية",
  ],
};

type Place = {
  name: string;
  nameEn: string;
  neighborhood: string;
  highlight: string;
  description: string;
  order: string;
  tip: string;
};

const restaurants: Place[] = [
  {
    name: "سفرة",
    nameEn: "Sufra",
    neighborhood: "شارع الرينبو، جبل عمّان",
    highlight: "طبخ بيتي أردني في فيلا تاريخية، على قائمة World's 50 Best Discovery",
    description: `افتتح سفرة عام 2011 في فيلا حجرية على شارع الرينبو، وسرعان ما صار الجواب عن سؤال طرحه الزوار وأهل البلد لسنوات: وين تروح لوجبة أردنية كاملة على أصولها، في مكان يليق بالأكل؟ والاسم يقول الكثير: السفرة التي تُفرد للضيوف، وهذه هي الضيافة التي يحاول المطعم أن يعيدها.

القائمة تغطي المطبخ الأردني والشامي البيتي بعمق لا تجرؤ عليه معظم المطاعم. المنسف هنا إلى جانب المقلوبة وفتة الباذنجان، ومقبلات تشمل أطباقًا نادرًا ما تراها خارج البيوت: ورق عنب بأكثر من طريقة، أنواع من الكبة، وأطباق موسمية. ولمن يحب المغامرة، الطحال المحشي موجود أيضًا.

الفيلا، بأقواسها الحجرية وفنائها المظلل وبلاطها القديم، تجعل التجربة أقرب إلى الأكل في بيت أحدهم منها إلى مطعم. سفرة مدرج في قائمة World's 50 Best Discovery، وظهر في مقالات السفر عن عمّان أكثر من أي مطعم آخر في الشارع. والحجز ضروري لغداء الجمعة.`,
    order: "المنسف، واطلبه على الطريقة التقليدية. وأضف فتة الباذنجان وأي طبق موسمي متوفر.",
    tip: "احجز مسبقًا لغداء الجمعة لأن الفناء يمتلئ بالكامل. الأطباق الرئيسية من حوالي 10 دنانير للشخص.",
  },
  {
    name: "شمس البلد",
    nameEn: "Shams Al Balad",
    neighborhood: "شارع الرينبو، جبل عمّان",
    highlight: "من محل ورد إلى أحد أشهر أماكن الفطور في عمّان، بإطلالة على جبل القلعة",
    description: `بدأ شمس البلد محلَّ ورد، وخلال عقد صار من أشهر مطاعم شارع الرينبو: مدرج في قائمة World's 50 Best Discovery ويُنصح به دائمًا كمكان الفطور مع إطلالة. والانتقال من الورد إلى الأكل جاء من مطبخ يفعل شيئًا مختلفًا: أطباق بيتية أردنية بمكوّنات عضوية محلية، في وقت لم يكن فيه إلا قلة من مطاعم المدينة يتبعون هذا النهج.

القائمة تتغير مع الموسم. من الثوابت عجة البقدونس بالبصل والسماق، كرات اللبنة بالأعشاب وزيت الزيتون، المكدوس، خبز الطابون المخبوز في المطعم، والقهوة اليمنية من مصدرها مباشرة. تقليدي في مكوّناته، ودقيق ومقصود في تنفيذه.

التراس المطل على جبل القلعة والقصر الأموي عبر الوادي من أجمل أماكن الفطور في المدينة، ويمتلئ بسرعة صباح الجمعة والسبت. شمس البلد يفتح للفطور والغداء، فهو نقطة بداية مثالية ليوم في شارع الرينبو: تاكل، تشرب قهوتك على مهل، وأنت أصلًا في المكان الذي تريده.`,
    order: "عجة البقدونس، كرات اللبنة، والقهوة اليمنية. واجلس على التراس إذا وجدت مكانًا.",
    tip: "احجز مسبقًا للعطلة. صباحات أيام الأسبوع قبل الساعة 9 أهدأ والتراس لك.",
  },
  {
    name: "رمان كوليكتيف",
    nameEn: "Rumman Collective",
    neighborhood: "شارع الرينبو، جبل عمّان",
    highlight: "مساحة ثقافية، حديقة داخلية، وبرانش نهاية الأسبوع",
    description: `يعلن رمان عن نفسه بالفاكهة التي يحمل اسمها: أشجار رمان وليمون عند المدخل، وزخارف الرمان في كل مكان، والدفء نفسه الذي تحمله الثمرة. المكان جزء مطبخ، جزء معرض، وجزء ملتقى؛ داخله مزيج من الحِرف الإقليمية وقطع التصميم المختارة، وشرفته تطل على حديقة خضراء تجعله يبدو بعيدًا تمامًا عن الشارع تحته.

الأكل مستوحى من التقاليد المتوسطية والعربية بأسلوب موسمي. برانش نهاية الأسبوع، السبت والأحد من 10 صباحًا حتى 2 ظهرًا، هو أهم ما يُقدَّم، بفرشات فطور على الطريقة الشامية، ومقبلات، وأطباق تتغير حسب المتوفر ذلك الأسبوع. والمطبخ جاد في اختيار مصادره؛ فالملكية الأردنية توصي برمان ضمن مجموعة من الوجهات المستدامة والمجتمعية في عمّان.

في أيام الأسبوع يفتح المكان للقهوة والأطباق الخفيفة، وهو أهدأ وأكثر تأملًا، ويستحق الزيارة فقط لتصفّح المعرض الذي يضم حِرفًا ومنسوجات وقطعًا من صنع حرفيين من المنطقة. الزيارتان تستحقان، لكن البرانش هو سبب مجيء معظم الناس أول مرة.`,
    order: "فرشة البرانش يوم السبت أو الأحد. تعال عند الافتتاح لأفضل طاولة في الحديقة.",
    tip: "أيام الأسبوع مناسبة للقهوة والمعرض. البرانش هو ما يشتهر به رمان.",
  },
  {
    name: "مساحة ميسا",
    nameEn: "Maisa Space",
    neighborhood: "شارع الرينبو، جبل عمّان",
    highlight: "من المزرعة إلى الطاولة: خبز ساوردو يومي ومكوّنات محلية وجو شخصي",
    description: `تقع مساحة ميسا قرب نهاية شارع الرينبو، وأسستها ميسا مقدادي لتكون شيئًا بين المقهى والمطبخ ومكانًا لتهدأ فيه. كل ما على الطاولة له مصدر معروف: الساوردو يُخبز كل صباح، واللبنة جرشية من جرش، والأعشاب والمربيات من مزارعين محليين أو مصنوعة يدويًا في المطبخ. لا تستعرض فكرة "من المزرعة إلى الطاولة"؛ هكذا يُصنع الأكل هنا ببساطة.

الفطور والغداء كلاهما يستحق. الصباح فيه بيض ولبنة ومربيات موسمية وجرانولا بيتية، فرشة تحتاج وقتًا وعناية. والغداء يميل إلى المقبلات الشامية: يالنجي، فتة جميد، وما يجهز من أطباق موسمية ذلك اليوم. وخلطات الأعشاب التي تُحضَّر في المكان من أطيب ما تجده في المدينة.

المكان صغير، وفيه حديقة خلفية تعطيه طابع البيت لا المحل التجاري. ميسا نفسها غالبًا موجودة، والترحيب شخصي. من الأماكن التي تصير زبونًا دائمًا فيها بعد زيارة واحدة: تمر للساوردو، تبقى للشاي، وتخرج ومعك مرطبان مربى.`,
    order: "ساوردو مع لبنة جرشية ومربى موسمي في الصباح. واسأل عن قائمة الغداء لذلك اليوم.",
    tip: "القائمة موسمية وليس كل شيء متوفرًا كل يوم. اسأل شو الطازج قبل ما تطلب.",
  },
  {
    name: "نملية",
    nameEn: "Namliyeh",
    neighborhood: "داخل The Good Book Store، شارع الرينبو",
    highlight: "مربيات حرفية وشاي أعشاب وعسل خام، في مقهى داخل إحدى أفضل مكتبات عمّان",
    description: `نملية علامة أكل ونمط حياة تصنع مربياتها الحرفية وخلطات شاي الأعشاب والعسل الخام بنفسها. وهي أيضًا مقهى داخل The Good Book Store في شارع الرينبو: مكتبة مستقلة غنية في قلب جبل عمّان، يقصدها أهل البلد والمقيمون الأجانب بحثًا عن الأدب الإقليمي وكتب السفر والخرائط والكتب الإنجليزية.

التركيبة ناجحة: تأتي للكتب، تجلس مع كاسة شاي أعشاب، وينتهي بك الأمر بصحن توست موسمي مع مربى البيت أو فطور خفيف. كل شيء مختار ومصنوع بنفس عناية منتجات النملية: محلي، موسمي، ومركّب بتفكير. القائمة تعكس ما يوفره الموسم والمزارعون، لا قائمة ثابتة طوال السنة.

ونملية تبيع منتجاتها للبيت أيضًا: مربيات في مرطبانات صغيرة، خلطات شاي، وعسل. صارت من أفضل الهدايا الغذائية في شارع الرينبو: صنع في الأردن، مغلّفة بعناية، وطيبة فعلًا. والمكتبة حولها تستحق التصفح حتى لو لم تطلب شيئًا.`,
    order: "شاي أعشاب مع التوست الموسمي المتوفر. وخذ مرطبان مربى أو خلطة شاي وأنت طالع.",
    tip: "تفتح الإثنين–الخميس والسبت–الأحد من 9:30 صباحًا حتى 9 مساءً، والجمعة من 3 حتى 9 مساءً.",
  },
  {
    name: "وايلد جوردان كافيه",
    nameEn: "Wild Jordan Café",
    neighborhood: "مركز وايلد جوردان، قرب الدوار الأول (حوالي 400 متر من شارع الرينبو)",
    highlight: "إطلالة بانورامية على البلد القديمة، في مقهى عضوي تديره الجمعية الملكية لحماية الطبيعة",
    description: `يقع وايلد جوردان كافيه داخل مركز وايلد جوردان التابع للجمعية الملكية لحماية الطبيعة. تراسه يطل على واد عميق باتجاه وسط البلد: المدرج الروماني، جبل القلعة، سلسلة التلال، والعلم الأردني الضخم. من أجمل الإطلالات في المدينة، بسعر فنجان قهوة.

القائمة تميل إلى العضوي والنباتي، وهذا أقل شيوعًا في عمّان مما يبدو. المطبخ يبقي العرض بسيطًا نسبيًا، سلطات وسندويشات وأطباق ساخنة وقهوة جيدة، لأن الأكل ليس الهدف الحقيقي. التراس هو الهدف. غداء هنا في يوم صافٍ، والمدينة ممتدة تحتك وضوء العصر على تلال الحجر الكلسي، تجربة تبقى في الذاكرة أطول من معظم وجبات المطاعم.

عائدات المقهى ومتجر الطبيعة داخل المركز تذهب مباشرة لدعم عمل الجمعية في محميات الأردن الطبيعية. والمتجر يبيع حِرفًا ومنتجات غذائية وطبيعية من صنع تعاونيات محلية في تلك المحميات، وهي هدايا أفضل من معظم ما تجده في الأماكن السياحية.`,
    order: "قهوة وأي طبق موسمي متوفر. التراس هو السبب الأساسي للمجيء.",
    tip: "حوالي 400 متر من شارع الرينبو، مشوار قصير مشيًا أو تكسي بدينارين. أجمل وقت هو الغداء في يوم صافٍ.",
  },
  {
    name: "بوكس كافيه",
    nameEn: "Books@Café",
    neighborhood: "شارع عمر بن الخطاب، جبل عمّان (متفرع من شارع الرينبو)",
    highlight: "أكثر مساحات عمّان انفتاحًا: مكتبة ومقهى ومعرض منذ 1997",
    description: `افتتح بوكس كافيه عام 1997 كأول مقهى إنترنت في الشرق الأوسط، وهذا يخبرك بما كان يحاول أن يكونه: مكانًا سابقًا لزمنه، يجمع أفكارًا وناسًا ما كانوا ليلتقوا في مكان واحد. مقهى الإنترنت انتهى منذ زمن، لكن الروح لم تتغير كثيرًا. ما زال من الأماكن القليلة في عمّان التي يتشارك فيها جمهور مختلط فعلًا، أهل البلد ومقيمون وسياح وطلاب وفنانون، غرفة واحدة دون أن يبدو الأمر مصطنعًا.

المكان على طابقين، بجدران طوب مكشوف وكراسٍ غير متشابهة ورفوف كتب للبيع أو التصفح. التراس العلوي يطل على أسطح جبل عمّان باتجاه التلال. المطبخ يقدّم الفطور والغداء والعشاء بقائمة واسعة من الأطباق الأردنية إلى المعكرونة الإيطالية والسندويشات، وفيه بار أيضًا. يفتح حتى منتصف الليل.

بوكس كافيه ليس أحدث مكان قرب شارع الرينبو ولا أكثرها رواجًا، وهذا جزء من قيمته. موجود هنا منذ زمن كافٍ ليصبح معلمًا ثابتًا لا وجهة عابرة: المكان الذي تنتهي إليه حين لا تعرف أين تذهب، وتكون سعيدًا بذلك.`,
    order: "ما يخطر ببالك، فالقائمة واسعة والقهوة جيدة. وابقَ على التراس إذا كانت الليلة صافية.",
    tip: "يفتح الأحد–الخميس من 10 صباحًا حتى منتصف الليل، والجمعة–السبت من 9 صباحًا حتى منتصف الليل.",
  },
  {
    name: "فلافل القدس",
    nameEn: "Al-Quds Falafel",
    neighborhood: "شارع الرينبو، جبل عمّان",
    highlight: "أشهر كشك فلافل في شارع الرينبو منذ 1966: سفري فقط، ويخلص قبل الظهر",
    description: `جاء مؤسس هذا الكشك الصغير في شارع الرينبو من القدس، ومن هنا الاسم. والفلافل تُصنع بالطريقة نفسها منذ 1966: قشرة غامقة مقرمشة، وخضراء من الداخل من كثرة الأعشاب، محشوة في خبز فرنسي مع البندورة والمخلل والبقدونس ورشّة طحينة. هذه هي القائمة كلها: شيء واحد، بنفس الجودة منذ ستين عامًا.

ما يميّزه ليس عمره فقط، بل السمعة التي بناها وحافظ عليها دون أن يغيّر شيئًا في طريقة عمله. جلالة الملك عبدالله وأفراد من العائلة المالكة توقّفوا هنا، وما زال أهل الحي يذكرون ذلك. لا جلسات، لا تنويعات، لا أسعار سياحية. فقط فلافل طازجة، وطابور يتشكّل قبل الساعة 8 في الصباحات المزدحمة.

الفلافل في أطيب حالاتها في الساعات الأولى: طازجة من المقلى، أكثر قرمشة وأطيب ريحة. والكشك يخلص قبل الظهر في معظم الأيام. إذا كنت في شارع الرينبو للفطور أو لمشوار الصبح، فهذه أول محطة، لا آخرها.`,
    order: "شيء واحد: ساندويش الفلافل، سخن من المقلى.",
    tip: "تعال قبل الساعة 9 لأطزج دفعة. الفلافل بتخلص، فلا تفترض أنك تقدر ترجع بعدين.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "أفضل مطاعم شارع الرينبو في عمّان",
      description:
        "دليل محلي للأكل في شارع الرينبو: سفرة، شمس البلد، رمان، مساحة ميسا، نملية، وايلد جوردان كافيه، بوكس كافيه، وفلافل القدس.",
      url: URL,
      image: "https://zowar.net/images/blog/rainbow-street--blue-gate-bougainvillea.jpg",
      datePublished: "2026-11-06",
      dateModified: "2026-11-06",
      author: { "@type": "Organization", name: "زوّار Zowar", url: "https://zowar.net" },
      publisher: {
        "@type": "Organization",
        name: "Zowar",
        url: "https://zowar.net",
        logo: { "@type": "ImageObject", url: "https://zowar.net/logo.png" },
      },
      inLanguage: "ar",
      about: [{ "@type": "City", name: "عمّان" }, { "@type": "Country", name: "الأردن" }],
    },
    {
      "@type": "ItemList",
      name: "مطاعم شارع الرينبو في عمّان",
      numberOfItems: restaurants.length,
      itemListElement: restaurants.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Restaurant",
          name: p.name,
          alternateName: p.nameEn,
          address: { "@type": "PostalAddress", addressLocality: "Jabal Amman", addressCountry: "JO" },
        },
      })),
    },
  ],
};

function PlaceCard({ place, index }: { place: Place; index: number }) {
  return (
    <section id={`place-${index + 1}`}>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tabular-nums" style={{ color: "rgba(200,105,74,0.18)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-2xl font-semibold text-neutral-950">
            {place.name}
            <span lang="en" className="ms-2 text-base font-normal text-neutral-400">{place.nameEn}</span>
          </h3>
          <p className="mt-0.5 text-sm text-neutral-500">{place.neighborhood}</p>
        </div>
      </div>

      <div className="mt-2 inline-block rounded-full bg-[#fef3ee] px-3 py-0.5 text-xs font-semibold text-[#c8694a]">
        {place.highlight}
      </div>

      <div className="mt-4 space-y-4">
        {place.description.split("\n\n").map((para, j) => (
          <p key={j} className="text-base leading-8 text-neutral-700">{para}</p>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/8 bg-white p-4">
          <p className="mb-1.5 text-xs font-bold text-neutral-400">شو تطلب</p>
          <p className="text-sm leading-6 text-neutral-700">{place.order}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="mb-1.5 text-xs font-bold text-amber-600">نصيحة محلية</p>
          <p className="text-sm leading-6 text-amber-900">{place.tip}</p>
        </div>
      </div>
    </section>
  );
}

export default function BestRestaurantsRainbowStreetAr() {
  return (
    <div lang="ar" dir="rtl" className={tajawal.className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-[#faf7f2] text-neutral-900">
        <div className="border-b border-black/8 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm">
            <Link href="/?lang=ar" className="text-neutral-500 hover:text-neutral-800 transition">زوّار</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/blog" className="text-neutral-500 hover:text-neutral-800 transition">المدونة</Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">مطاعم شارع الرينبو</span>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-6 py-14">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c8694a] bg-[#fef3ee] px-3 py-1 text-xs font-semibold text-[#c8694a]">
              دليل الأكل · شارع الرينبو، عمّان
            </div>
            <h1 className="text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl">
              أفضل مطاعم شارع الرينبو في عمّان
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              من كشك فلافل يعمل منذ 1966 إلى فيلا أردنية على قائمة World&apos;s 50 Best
              Discovery: دليل محلي للأكل في شارع الرينبو وما حوله.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              <span>بقلم فريق زوّار · عمّان</span>
              <span>·</span>
              <span>قراءة 12 دقيقة</span>
              <span>·</span>
              <span>محدّث 2026</span>
            </div>
            <BlogTranslations
              prefix="متوفر أيضًا بـ:"
              links={[{ lang: "en", label: "English", href: "/blog/best-restaurants-rainbow-street" }]}
            />
          </header>

          <figure className="mb-10">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl sm:h-96">
              <Image
                src="/images/blog/rainbow-street--blue-gate-bougainvillea.jpg"
                alt="بوابة زرقاء وزهور الجهنمية في شارع الرينبو في عمّان"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">شارع الرينبو: معظم الأكل الطيب في هذه القائمة على بعد عشر دقائق مشيًا</figcaption>
          </figure>

          <section className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <p className="text-base leading-8 text-neutral-700">
              شارع الرينبو ليس نوعًا واحدًا من الأكل. فيه كشك فلافل يفعل الشيء نفسه منذ
              1966، وإلى جانبه فيلا تقدّم المنسف لضيوفها منذ 2011، وإلى جانبهما مقهى بدأ
              محلَّ ورد وانتهى على قائمة عالمية. الشارع وما حوله يجمع تنوعًا وجودة في كل
              كيلومتر أكثر من أي مكان تقريبًا في عمّان. هذا الدليل يغطي الأماكن الثمانية
              التي تستحق أن تعرفها، من الفطور حتى سهرة متأخرة على التراس.
            </p>
          </section>

          <nav className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
            <p className="mb-4 text-xs font-bold text-neutral-400">في هذا الدليل</p>
            <ol className="space-y-1.5 text-sm">
              {restaurants.map((p, i) => (
                <li key={p.nameEn} className="flex items-center gap-2">
                  <span className="text-xs font-bold tabular-nums text-[#c8694a]/40">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#place-${i + 1}`} className="text-neutral-700 hover:text-[#c8694a] transition">{p.name}</a>
                </li>
              ))}
            </ol>
          </nav>

          <figure className="mt-8">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/amman-traditional-cafe-interior.jpg"
                alt="مقهى تقليدي في شارع الرينبو بوسائد ملوّنة وإطلالة على المدينة"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">مقهى في شارع الرينبو، الحي الذي تعيش فيه معظم هذه المطاعم منذ سنوات</figcaption>
          </figure>

          <div className="mt-14 space-y-16">
            {restaurants.map((place, i) => (
              <PlaceCard key={place.nameEn} place={place} index={i} />
            ))}
          </div>

          <figure className="mt-10">
            <div className="relative h-60 w-full overflow-hidden rounded-3xl sm:h-72">
              <Image
                src="/images/blog/jordanian-kilim-rugs-rainbow-street.jpg"
                alt="سجاد كليم أردني ملوّن معلّق خارج محل في شارع الرينبو"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 text-center text-xs text-neutral-400">شارع الرينبو: محلات وحِرف وأكل في نفس البلوك</figcaption>
          </figure>

          <section className="mt-16 rounded-3xl border border-black/8 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-neutral-950">نصائح للأكل في شارع الرينبو</h2>
            <ul className="mt-5 space-y-5 text-sm leading-7 text-neutral-700">
              {[
                ["احجز في سفرة وشمس البلد.", "الاثنان مزدحمان بما يكفي ليمتلئا في غداء الجمعة والسبت. مكالمة سريعة أو حجز أونلاين يوفّر عليك المشوار."],
                ["بكّر للفلافل.", "فلافل القدس يخلص قبل الظهر. إذا بدك إياها طازجة من المقلى، خليك هناك بين 8 و9 الصبح."],
                ["رمان ومساحة ميسا أحلى بأيام الأسبوع.", "الاثنان أهدأ خلال الأسبوع، ويقدّمان نسخة أريح من تجربة شارع الرينبو."],
                ["امشِ بين الرينبو واللويبدة.", "معظم هذه المطاعم على بعد 15 دقيقة مشيًا من بعضها. فطور في طرف وغداء في الطرف الثاني يصنع يومًا حلوًا."],
                ["خذ كاش للأماكن الصغيرة.", "نملية ومساحة ميسا وفلافل القدس أماكن يفضّل فيها النقد، والأسعار منخفضة."],
              ].map(([title, body]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8694a]" />
                  <span>
                    <strong className="font-bold text-neutral-900">{title}</strong>{" "}
                    {body}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 rounded-3xl border border-[#c8694a]/20 bg-[#fef3ee] p-6 sm:p-8">
            <p className="text-xs font-bold text-[#c8694a]">جرّب شارع الرينبو بطريقة مختلفة</p>
            <h2 className="mt-2 text-xl font-bold text-neutral-950">
              اكتشف الشارع مع تجربة زوّار
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              عدد من الأماكن في هذه القائمة محطات على مسار زوّار: جولة أكل وألغاز ذاتية
              في شارع الرينبو لكل من يريد أن يكتشف الحي على أصوله. تتبع الأدلة على راحتك،
              تتذوق الأكل الأردني في أماكن محلية مختارة، وتركّب صورة لجانب من عمّان يمرّ
              عنه معظم الزوار دون أن يلاحظوه. تشمل تذوقًا وهدايا بقيمة تزيد على 25 دينارًا.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking?lang=ar"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#c8694a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                احجز التجربة ←
              </Link>
              <Link
                href="/?lang=ar"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                عن الجولة
              </Link>
            </div>
          </section>

          <div className="mt-14 flex items-center justify-between border-t border-black/8 pt-8 text-sm text-neutral-500">
            <Link href="/blog" className="hover:text-neutral-800 transition">→ كل الأدلة</Link>
            <Link href="/blog/ar/best-breakfast-amman" className="hover:text-neutral-800 transition">أفضل فطور في عمّان ←</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
