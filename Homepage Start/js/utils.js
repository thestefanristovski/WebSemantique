// parse raw JSON result with dupes in a single object (using the format of the SPARQL result)
function removeDuplicates(dupes) {

    // attributs problématiques
    const conflictFields = ["awardName", "composerName", "computingPlatformName", "directorName", "jv2"];

    let result = JSON.parse(JSON.stringify(dupes.results.bindings[0]));     // separate copy of the object

    // initialisation des tableaux d'éléments qui posent problème
    conflictFields.forEach(field => {
        if (result[field] !== undefined) {
            result[field] = [result[field]];
        } else {
            result[field] = [];
            // console.log("undef field "+ field +" for result: " + result[field] + " --- " + result[field].length + "\n\n");
        }
    });

    dupes.results.bindings.slice(1).forEach(elem => {

        conflictFields.forEach(field => {

            if (elem[field]) {      // don't try to parse if undef

                var isDupe = false;

                result[field].forEach(prop => {
                    if (prop.value === elem[field].value) {
                        isDupe = true;
                    }
                });

                if (!isDupe) {
                    // console.log("elem[field] : " + elem[field]);
                    result[field].push(JSON.parse(JSON.stringify(elem[field])));
                }
            }
        });

    });

    return result;
}

// --------- DEBUG

// !! fold plz
/*var test =
    {
        "head": {
            "link": [],
            "vars": ["jv", "name", "awardName", "computingPlatformName", "seriesName", "directorName", "label", "publisherName", "developerName", "composerName", "desc"]
        },
        "results": {
            "distinct": false, "ordered": true, "bindings": [
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "List of video games considered the best"
                    },
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "IQue Player"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Yoshiaki Koizumi"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {"type": "literal", "xml:lang": "en", "value": "Game of the Year"},
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "Nintendo 64"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Eiji Aonuma"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {"type": "literal", "xml:lang": "en", "value": "Game of the Year"},
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "Nintendo 64"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Shigeru Miyamoto"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "List of video games considered the best"
                    },
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "Nintendo 64"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Shigeru Miyamoto"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {"type": "literal", "xml:lang": "en", "value": "Game of the Year"},
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "GameCube"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Eiji Aonuma"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "List of video games considered the best"
                    },
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "IQue Player"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Shigeru Miyamoto"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {"type": "literal", "xml:lang": "en", "value": "Game of the Year"},
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "IQue Player"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Eiji Aonuma"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {"type": "literal", "xml:lang": "en", "value": "Game of the Year"},
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "Nintendo 64"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Yoshiaki Koizumi"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "List of video games considered the best"
                    },
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "Nintendo 64"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Eiji Aonuma"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {"type": "literal", "xml:lang": "en", "value": "Game of the Year"},
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "IQue Player"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Yoshiaki Koizumi"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "List of video games considered the best"
                    },
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "GameCube"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Eiji Aonuma"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "List of video games considered the best"
                    },
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "IQue Player"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Eiji Aonuma"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {"type": "literal", "xml:lang": "en", "value": "Game of the Year"},
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "IQue Player"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Shigeru Miyamoto"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {"type": "literal", "xml:lang": "en", "value": "Game of the Year"},
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "GameCube"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Yoshiaki Koizumi"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "List of video games considered the best"
                    },
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "GameCube"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Shigeru Miyamoto"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {"type": "literal", "xml:lang": "en", "value": "Game of the Year"},
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "GameCube"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Shigeru Miyamoto"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "List of video games considered the best"
                    },
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "GameCube"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Yoshiaki Koizumi"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                },
                {
                    "jv": {"type": "uri", "value": "http://dbpedia.org/resource/The_Legend_of_Zelda:_Ocarina_of_Time"},
                    "name": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda: Ocarina of Time"},
                    "awardName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "List of video games considered the best"
                    },
                    "computingPlatformName": {"type": "literal", "xml:lang": "en", "value": "Nintendo 64"},
                    "seriesName": {"type": "literal", "xml:lang": "en", "value": "The Legend of Zelda"},
                    "directorName": {"type": "literal", "xml:lang": "en", "value": "Yoshiaki Koizumi"},
                    "label": {"type": "literal", "xml:lang": "en", "value": "Action-adventure game"},
                    "publisherName": {"type": "literal", "xml:lang": "en", "value": "Nintendo Co., Ltd."},
                    "developerName": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "Nintendo Entertainment Analysis & Development"
                    },
                    "composerName": {"type": "literal", "xml:lang": "en", "value": "Koji Kondo"},
                    "desc": {
                        "type": "literal",
                        "xml:lang": "en",
                        "value": "The Legend of Zelda: Ocarina of Time is an action-adventure video game developed and published by Nintendo for the Nintendo 64. It was released in Japan and North America in November 1998, and in Europe and Australia in December 1998. Originally developed for the 64DD peripheral, the game was instead released on a 256-megabit (32-megabyte) cartridge, the largest-capacity cartridge Nintendo produced at that time. Ocarina of Time is the fifth game in the The Legend of Zelda series, and the first with 3D graphics. It was followed by a direct sequel, The Legend of Zelda: Majora's Mask, in 2000. In Ocarina of Time, the player controls Link in the land of Hyrule. Link sets out on a quest to stop Ganondorf, king of the Gerudo tribe, from obtaining the Triforce, a sacred relic that grants the wishes of its holder. He travels through time and navigates various dungeons to awaken the sages, who have the power to seal Ganondorf away forever. Music plays an important role: To progress, the player must learn to play several songs on an ocarina. The game was responsible for increased interest in and sales of the instrument. Ocarina of Time's gameplay introduced features such as a target-lock system and context-sensitive buttons that have since become common in 3D adventure games. In Japan, more than 820,000 copies were sold in 1998, making it the tenth best-selling game of that year. During its lifetime, 1.14 million copies of Ocarina of Time were sold in Japan, and over 7.6 million copies were sold worldwide. The game won the Grand Prize in the Interactive Art division at the Japan Media Arts Festival, and won six honors at the 2nd Annual Interactive Achievement Awards. As of 2016, it is the highest-rated game on review-aggregating site Metacritic, with a score of 99/100; in 2008 and 2010, Guinness World Records listed Ocarina of Time as the highest-rated game ever reviewed. It is considered by many critics and gamers to be the greatest video game of all time. Ocarina of Time has had four major rereleases. It was originally ported to the GameCube alongside , which featured reworked dungeons with new puzzles, and was included in The Legend of Zelda: Collector's Edition. It was also ported to the iQue Player in 2003, and was made available via the Virtual Console service for the Wii and Wii U in 2007 and 2015 respectively. The rereleases were well received; although some critics considered the game outdated even during the initial rerelease, other reviewers believed it had aged well. A remake for the Nintendo 3DS, Ocarina of Time 3D, was released in 2011 with updated graphics and new autostereoscopic 3D effects; it includes Master Quest's rearranged dungeons, which are absent from the Wii, Wii U, and iQue versions."
                    }
                }]
        }
    };

var res = removeDuplicates(test);

console.log(res);*/
