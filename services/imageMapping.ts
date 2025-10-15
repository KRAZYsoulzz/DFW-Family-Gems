// Curated image URLs for each location
// Using high-quality images from Unsplash (direct links, no API needed)

export interface LocationImages {
  main: string;
  gallery: string[];
}

export const locationImageMap: { [locationId: number]: LocationImages } = {
  // Parks
  1: { // Klyde Warren Park
    main: "https://images.unsplash.com/photo-1597694434571-7a6b7b7e5f4f?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1597694434571-7a6b7b7e5f4f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
    ]
  },
  12: { // White Rock Lake Park
    main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop"
    ]
  },
  15: { // Trinity Park
    main: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598134493097-d2796bf0340d?w=800&h=600&fit=crop"
    ]
  },
  18: { // River Legacy Parks
    main: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=600&fit=crop"
    ]
  },
  20: { // Randol Mill Park
    main: "https://images.unsplash.com/photo-1572023439658-f7edc9f5b02e?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1572023439658-f7edc9f5b02e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=800&h=600&fit=crop"
    ]
  },
  37: { // Fort Worth Water Gardens
    main: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1548946526-f69e2424cf45?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop"
    ]
  },
  47: { // Eagle Mountain Lake Park
    main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&h=600&fit=crop"
    ]
  },

  // Museums
  2: { // Perot Museum
    main: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&h=600&fit=crop"
    ]
  },
  7: { // Dallas World Aquarium
    main: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&h=600&fit=crop"
    ]
  },
  13: { // Fort Worth Museum of Science
    main: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop"
    ]
  },
  25: { // National Videogame Museum
    main: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop"
    ]
  },
  29: { // Sea Life Grapevine Aquarium
    main: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=800&h=600&fit=crop"
    ]
  },
  32: { // Kimbell Art Museum
    main: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=800&h=600&fit=crop"
    ]
  },
  41: { // Amon Carter Museum
    main: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1577083300990-f0796012a626?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop"
    ]
  },
  44: { // The Modern Art Museum
    main: "https://images.unsplash.com/photo-1577083300990-f0796012a626?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1577083300990-f0796012a626?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800&h=600&fit=crop"
    ]
  },

  // Outdoors & Gardens
  3: { // Fort Worth Botanic Garden
    main: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&h=600&fit=crop"
    ]
  },
  8: { // Fort Worth Zoo
    main: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551817958-20c93c9f3fdbb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540206395-68808572332f?w=800&h=600&fit=crop"
    ]
  },
  10: { // Arbor Hills Nature Preserve
    main: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
    ]
  },
  11: { // Dallas Arboretum
    main: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=800&h=600&fit=crop"
    ]
  },
  14: { // Sundance Square
    main: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop"
    ]
  },
  19: { // Levitt Pavilion
    main: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop"
    ]
  },
  21: { // Chandor Gardens
    main: "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600077106724-946750eeaf3c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&h=600&fit=crop"
    ]
  },
  22: { // Clark Gardens
    main: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563789031959-4c02bcb41319?w=800&h=600&fit=crop"
    ]
  },
  26: { // Heard Natural Science Museum
    main: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop"
    ]
  },
  33: { // The Shops at Clearfork
    main: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop"
    ]
  },
  38: { // Stockyards National Historic District
    main: "https://images.unsplash.com/photo-1546971587-02375cbbdffb?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1546971587-02375cbbdffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop"
    ]
  },
  48: { // Dinosaur Valley State Park
    main: "https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop"
    ]
  },
  49: { // Fossil Rim Wildlife Center
    main: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551817958-20c93c9f3fdbb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546429964-b965a7e4569f?w=800&h=600&fit=crop"
    ]
  },
  50: { // Granbury City Beach Park
    main: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop"
    ]
  },

  // Playgrounds & Indoor
  4: { // Adventure World Park
    main: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598134493097-d2796bf0340d?w=800&h=600&fit=crop"
    ]
  },
  5: { // Crayola Experience
    main: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&h=600&fit=crop"
    ]
  },
  6: { // Hope Park
    main: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop"
    ]
  },
  9: { // Play Street Museum
    main: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&h=600&fit=crop"
    ]
  },
  16: { // Dream Park
    main: "https://images.unsplash.com/photo-1598134493097-d2796bf0340d?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1598134493097-d2796bf0340d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop"
    ]
  },
  28: { // LEGOLAND Discovery Center
    main: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&h=600&fit=crop"
    ]
  },
  31: { // Celebration Park
    main: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598134493097-d2796bf0340d?w=800&h=600&fit=crop"
    ]
  },
  34: { // Parr Park
    main: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598134493097-d2796bf0340d?w=800&h=600&fit=crop"
    ]
  },
  43: { // Flight Deck Trampoline Park
    main: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop"
    ]
  },
  45: { // Main Event
    main: "https://images.unsplash.com/photo-1580820267115-bfd8bacab3bf?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1580820267115-bfd8bacab3bf?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop"
    ]
  },

  // Waterparks
  30: { // NRH2O Family Water Park
    main: "https://images.unsplash.com/photo-1561212044-bac5ef688a07?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1561212044-bac5ef688a07?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527933053326-89d1746b76b9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"
    ]
  },
  36: { // Epic Waters Indoor Waterpark
    main: "https://images.unsplash.com/photo-1527933053326-89d1746b76b9?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1527933053326-89d1746b76b9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561212044-bac5ef688a07?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop"
    ]
  },
  39: { // Burger's Lake
    main: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop"
    ]
  },
  40: { // Benbrook Lake
    main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=600&fit=crop"
    ]
  },

  // Attractions
  17: { // Bureau of Engraving and Printing
    main: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&h=600&fit=crop"
    ]
  },
  23: { // Holland Lake Park
    main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&h=600&fit=crop"
    ]
  },
  24: { // The National Vietnam War Museum
    main: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop"
    ]
  },
  27: { // Grapevine Vintage Railroad
    main: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=600&fit=crop"
    ]
  },
  35: { // Fritz Park Petting Farm
    main: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=600&fit=crop"
    ]
  },
  42: { // Texas Civil War Museum
    main: "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop"
    ]
  },
  46: { // D-BAT
    main: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1627241561457-c4d85d3fef3b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&h=600&fit=crop"
    ]
  }
};

// Fallback images for locations not in the map
export const defaultImages: LocationImages = {
  main: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&h=600&fit=crop"
  ]
};

// Helper function to get images for a location
export function getLocationImages(locationId: number): LocationImages {
  return locationImageMap[locationId] || defaultImages;
}