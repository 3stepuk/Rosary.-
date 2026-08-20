import { MysterySetKey, MysterySetData } from '../types';

export const PRAYERS_ENGLISH = {
  SIGN_OF_CROSS: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  APOSTLES_CREED: "I believe in God, the Father almighty, Creator of heaven and earth, and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
  OUR_FATHER: "Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
  HAIL_MARY: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
  GLORY_BE: "Glory be to the Father, and to the Son, and to the Holy Spirit; as it was in the beginning, is now, and ever shall be, world without end. Amen.",
  FATIMA_PRAYER: "O my Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to Heaven, especially those most in need of thy mercy. Amen.",
  HAIL_HOLY_QUEEN: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ. Amen."
};

export const PRAYERS_LATIN = {
  SIGN_OF_CROSS: "In nómine Patris, et Fílii, et Spíritus Sancti. Amen.",
  APOSTLES_CREED: "Credo in Deum Patrem omnipoténtem, Creatórem cæli et terræ. Et in Iesum Christum, Fílium eius únicum, Dóminum nostrum: qui concéptus est de Spíritu Sancto, natus ex María Vírgine, passus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus: descéndit ad ínferos; tértia die resurréxit a mórtuis; ascéndit ad cælos; sedet ad déxteram Dei Patris omnipoténtis: inde ventúrus est iudicáre vivos et mórtuos. Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam, sanctórum communiónem, remissiónem peccatórum, carnis resurrectiónem, vitam ætérnam. Amen.",
  OUR_FATHER: "Pater noster, qui es in cælis, sanctificétur nomen tuum. Advéniat regnum tuum. Fiat volúntas tua, sicut in cælo et in terra. Panem nostrum cotidiánum da nobis hódie, et dimítte nobis débita nostra sicut et nos dimíttimus debitóribus nostris. Et ne nos indúcas in tentatiónem, sed líbera nos a malo. Amen.",
  HAIL_MARY: "Ave María, grátia plena, Dóminus tecum. Benedícta tu in muliéribus, et benedíctus fructus ventris tui, Iesus. Sancta María, Mater Dei, ora pro nobis peccatóribus, nunc et in hora mortis nostræ. Amen.",
  GLORY_BE: "Glória Patri, et Fílio, et Spíritui Sancto. Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.",
  FATIMA_PRAYER: "Domine Iesu, dimitte nobis debita nostra, salva nos ab igne inferiori, perduc in caelum omnes animas, praesertim eas, quae misericordiae tuae maxime indigent. Amen.",
  HAIL_HOLY_QUEEN: "Salve, Regína, Mater misericórdiæ; vita, dulcédo, et spes nostra, salve. Ad te clamámus, éxsules fílii Hevæ. Ad te suspirámus, geméntes et flentes in hac lacrimárum valle. Eia ergo, advocáta nostra, illos tuos misericórdes óculos ad nos convérte. Et Iesum, benedíctum fructum ventris tui, nobis post hoc exsílium osténde. O clemens, o pia, o dulcis Virgo María. Ora pro nobis, Sancta Dei Génetrix, ut digni efficiámur promissiónibus Christi. Amen."
};

export const MYSTERY_DATA: Record<MysterySetKey, MysterySetData> = {
  joyful: {
    label: "Joyful",
    days: "Monday & Saturday",
    description: "Meditations on the Incarnation, humble beginnings, and hidden life of Jesus Christ.",
    mysteries: [
      {
        title: "The Annunciation",
        scripture: "Luke 1:26–38",
        fruit: "Humility",
        reflection: "The angel Gabriel greets a young woman in an unremarkable town, and she answers with her whole life: 'Let it be done unto me.' Heaven's plan turns on the free consent of a girl who owns nothing but her yes."
      },
      {
        title: "The Visitation",
        scripture: "Luke 1:39–56",
        fruit: "Charity toward Neighbor",
        reflection: "Newly carrying her own great secret, Mary sets out in haste — not for herself, but for her older cousin who needs help. The child in her womb makes the child in Elizabeth's leap for joy."
      },
      {
        title: "The Nativity",
        scripture: "Luke 2:1–20",
        fruit: "Poverty of Spirit",
        reflection: "There was no room, so the King of the world was born where animals sleep. Shepherds, the least important people in the region, are the first ones told."
      },
      {
        title: "The Presentation",
        scripture: "Luke 2:22–38",
        fruit: "Obedience & Purity",
        reflection: "Mary and Joseph keep the ordinary law like anyone else's family, handing their son into old Simeon's arms — a man who has waited his whole life for this exact moment."
      },
      {
        title: "The Finding in the Temple",
        scripture: "Luke 2:41–52",
        fruit: "Joy in Finding Christ",
        reflection: "Three frightening days of searching end in the last place they thought to look — Jesus, calm among the teachers, wondering why they didn't know where he'd be."
      }
    ]
  },
  sorrowful: {
    label: "Sorrowful",
    days: "Tuesday & Friday",
    description: "Meditations on the Passion, suffering, and sacrificial love of Our Lord.",
    mysteries: [
      {
        title: "The Agony in the Garden",
        scripture: "Matthew 26:36–46",
        fruit: "Sorrow for Sin & Conformity to God's Will",
        reflection: "Alone at night while his closest friends sleep, Jesus asks that the cup pass from him — and then accepts it anyway. Real courage is not the absence of dread; it is praying through it."
      },
      {
        title: "The Scourging at the Pillar",
        scripture: "Matthew 27:26",
        fruit: "Purity & Mortification",
        reflection: "An innocent man's body absorbs a punishment meant to break him before he is even sentenced. There is no dignity offered to him here — only cruelty, taken willingly."
      },
      {
        title: "The Crowning with Thorns",
        scripture: "Matthew 27:27–31",
        fruit: "Moral Courage & Victory over Pride",
        reflection: "Soldiers dress him as a mock king to humiliate him, not knowing they are telling the truth. He wears the thorns without a single word of self-defense."
      },
      {
        title: "The Carrying of the Cross",
        scripture: "Luke 23:26–32",
        fruit: "Patience in Trials",
        reflection: "Weakened beyond his own strength, Jesus needs a stranger's help to carry the weight assigned to him. Even here, women along the road weep for him, and he turns to comfort them instead."
      },
      {
        title: "The Crucifixion",
        scripture: "John 19:17–30",
        fruit: "Perseverance & Forgiveness",
        reflection: "From the cross he forgives the men killing him, entrusts his mother to a friend, and finishes what he came to do. Love, at its limit, still gives rather than takes."
      }
    ]
  },
  glorious: {
    label: "Glorious",
    days: "Wednesday & Sunday",
    description: "Meditations on Christ's victory over death and the eternal glory of Heaven.",
    mysteries: [
      {
        title: "The Resurrection",
        scripture: "John 20:1–18",
        fruit: "Faith & Hope",
        reflection: "The tomb that should have ended the story stands open and empty. Mary Magdalene, weeping in a graveyard, is the very first to hear her own name spoken by the risen Christ."
      },
      {
        title: "The Ascension",
        scripture: "Luke 24:50–53",
        fruit: "Desire for Heaven",
        reflection: "Jesus doesn't disappear — he is lifted up in full view, blessing his friends as he goes, and they leave that hillside not grieving but full of joy."
      },
      {
        title: "The Descent of the Holy Spirit",
        scripture: "Acts 2:1–4",
        fruit: "Wisdom & Zeal for Souls",
        reflection: "A locked room of frightened disciples becomes, in an instant, a room of people bold enough to speak to crowds in languages they never learned. Fear does not get the last word."
      },
      {
        title: "The Assumption of Mary",
        scripture: "Revelation 12:1",
        fruit: "Grace of a Happy Death",
        reflection: "The woman who carried God in her body is carried, body and soul, into the glory her son promised. What is given to her first is promised to everyone who follows him."
      },
      {
        title: "The Coronation of Mary",
        scripture: "Revelation 12:1",
        fruit: "Trust in Mary's Intercession",
        reflection: "Mary is honored not as a distant queen but as the mother of the household, close enough to be asked for anything, and glad to bring every request to her son."
      }
    ]
  },
  luminous: {
    label: "Luminous",
    days: "Thursday",
    description: "Meditations on the public ministry, light, and teachings of Jesus Christ.",
    mysteries: [
      {
        title: "The Baptism in the Jordan",
        scripture: "Matthew 3:13–17",
        fruit: "Openness to the Holy Spirit",
        reflection: "Jesus, who needs no cleansing, wades into the river anyway to stand with everyone who does. The sky opens, and a voice names him: beloved, and well-pleasing."
      },
      {
        title: "The Wedding at Cana",
        scripture: "John 2:1–11",
        fruit: "Trust in Christ's Help",
        reflection: "When the wine runs out and the celebration is at risk, Mary simply tells the servants, 'Do whatever he tells you.' It's the shortest instruction in the Gospels, and still the best advice."
      },
      {
        title: "The Proclamation of the Kingdom",
        scripture: "Mark 1:14–15",
        fruit: "Repentance & Trust in the Gospel",
        reflection: "Jesus opens his public ministry with an invitation, not a threat: the kingdom is near, so turn around and believe the good news is actually good."
      },
      {
        title: "The Transfiguration",
        scripture: "Matthew 17:1–8",
        fruit: "Desire for Holiness",
        reflection: "For a moment on a mountain, three friends see Jesus as he truly is — light breaking through the ordinary shape they'd gotten used to. Then it passes, and they walk back down."
      },
      {
        title: "The Institution of the Eucharist",
        scripture: "Matthew 26:26–29",
        fruit: "Adoration & Eucharistic Love",
        reflection: "On the night before he is betrayed, Jesus takes bread and wine and gives his friends a way to keep him close forever: 'This is my body. Do this in memory of me.'"
      }
    ]
  }
};
