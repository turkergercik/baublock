// routes.js


const navbarRoutes = [
     {
      label: 'News',
      path: '/news',
    },
    {
      label: 'Research',
      children: [
        { label: 'On-chain Dashboard', path: '/insights' },
        { label: 'Insights', path: '/research/insights' },
        { label: 'Research Articles', path: '/research/insights' },
        { label: 'On-chain Reports', path: '/insights' },
       
      ],
    },{
      label: 'Academy',
      children: [
        { label: 'Articles', path: '/academy/articles' },
        { label: 'Sha Example', path: '/services/sha' },
        { label: 'Fintech for Everyone ', path: '/fintechforeveryone' },
        { label: 'Fintech Masters Program', path: '/fintechforeveryone' },
      ],
    },
    {
      label: 'Events',
      path: '/events',
    },{
      label: 'YouTube',
      path: '/youtube',
    },
  ];
  
  export default navbarRoutes;
  