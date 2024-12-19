// routes.js


const navbarRoutes = [
     {
      label: 'News',
      path: '/',
    },
    {
      label: 'Research',
      children: [
        { label: 'Insights', path: '/insights' },
        { label: 'On-chain Metrics', path: '/insights' },
      ],
    },{
      label: 'Academy',
      children: [
        { label: 'Articles', path: '/academy/articles' },
        { label: 'Sha Example', path: '/services/sha' },
        { label: 'Fintech for Everyone ', path: '/fintechforeveryone' },
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
  