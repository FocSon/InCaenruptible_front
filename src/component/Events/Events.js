import React, { useState } from 'react';
import AccordionComponent from './Accordion';
import FilterComponent from './Filter';

import antoineVOD from "../../vod/antoineBebou.mp4";
import castorImage from "../../imgs/castor.webp";
import sadPoussin from "../../imgs/sad_poussin.jpg";
import eauMarron from "../../imgs/eau_marron.jpg";
import deversementEau from "../../imgs/deversement_eau.webp";


const Event = () => {
  const [responses] = useState([
    {
      id: 1,
      title: 'Le scandale Legumistar',
      description: 'Maltraitance de pauvre légume avec tentative de fuite des malfaiteurs',
      startTime: 1644566400000,
      endTime: 1644570000000,
      type: 'video', //video, photo, data
      category: 'dechet', //pollution, son, dechet
      link: antoineVOD
    },
    {
      id: 2,
      title: 'Castor malheureux sur un petit rondin',
      description: 'Petit Castor trouvé aux abords de la Folie Couvre Chef vers 18h le 13 Janvier 2024. L animal était apparement seul, privé de ses congénères et semblait très triste. Il subit les agissements de la mairie de Caen.',
      startTime: 1644566400000,
      endTime: null,
      type: 'photo', //video, photo, data
      category: 'pollution', //pollution, son, dechet
      link: castorImage
    },
    {
      id: 3,
      title: 'Poussin abandonné par la mairie',
      description: 'Un poussin à la rue ! La mairie a abandonné sa mascotte Poussinus pour cause de défécation sur des papiers administratifs. Est-ce trop demander de prendre soin de ces petites bêtes ?',
      startTime: 1644566400000,
      endTime: null,
      type: 'photo', //video, photo, data
      category: 'pollution', //pollution, son, dechet
      link: sadPoussin
    },
    {
      id: 4,
      title: 'Etat de l eau à Caen',
      description: 'Plusieurs clichés nous montrent que l état de l eau est catastrophique dans notre autrefois belle commune de Caen. Le traitement des eaux par la mairie nous laisse avec beaucoup d interrogations...',
      startTime: 1644566400000,
      endTime: null,
      type: 'photo', //video, photo, data
      category: 'pollution', //pollution, son, dechet
      link: eauMarron
    },
    {
      id: 5,
      title: 'Nestlo deverse ses eaux polluées dans l Orne !',
      description: 'Un reporter audacieux a pu prendre en photo les pratiques honteuses de Nestlo. Cette enterprise se croit tout permis et deverse directement ses déchets dans l Orne. Nous ne laisserons pas ces actes impunis',
      startTime: 1644566400000,
      endTime: null,
      type: 'photo', //video, photo, data
      category: 'dechet', //pollution, son, dechet
      link: deversementEau
    },
    {
      id: 6,
      title: 'Des nuissances sonores à caen',
      description: 'Le centre de Caen a atteint le chiffre record de 100dB, mais que fais la mairie ?!',
      startTime: 1644566400000,
      endTime: null,
      type: 'data', //video, photo, data
      category: 'son', //pollution, son, dechet
    },
    {
      id: 7,
      title: 'un nombre record de dechet dans la rue',
      description: 'Sur un déplacement de 2km j ai trouvé 100 emballages par terre c est innaceptable!',
      startTime: 1644566400000,
      endTime: null,
      type: 'data', //video, photo, data
      category: 'dechet', //pollution, son, dechet
    },
  ]);

  const [items, setItems] = useState([]);
  const handleFilterChange = (selectedFilters) => {
    setItems((prevItems) => {
      // Use the previous items to calculate the new items
      const filteredItems = responses
        .filter(doIDisplay)
        .map((response) => ({
          title: response.title,
          content: response.description,
          type: response.type,
          category: response.category,
          link: response.link,
          isOpen: false,
        }));
  
      return filteredItems;
    });
  
    function doIDisplay(item) {
      if (item.type === 'video') {
        if(selectedFilters.includes('VOD')) {
          return false;
        }
      } else if (item.type === 'photo') {
        if(selectedFilters.includes('PICTURE')) {
          return false;
        }
      } else if (item.type === 'data') {
        if(selectedFilters.includes('DATA')) {
          return false;
        }
      }

      if (item.category === 'pollution') {
        if(selectedFilters.includes('POLL')) {
          return false;
        }
      } else if (item.category === 'son') {
        if(selectedFilters.includes('SOUND')) {
          return false;
        }
      } else if (item.category === 'dechet') {
        if(selectedFilters.includes('TRASH')) {
          return false;
        }
      }
    
      return true;
    }
  };
  

  return (
    <main className=''>
      <FilterComponent onFilterChange={handleFilterChange}/>
      <AccordionComponent items={items}/>
    </main>
  );
};

export default Event;
