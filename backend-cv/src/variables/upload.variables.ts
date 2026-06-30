const uploadVariables = {
  contacts: {
    name: 'contacts',
    multiFile: false,
    cacheKey: 'contacts-data',
    cacheTime: 60000,
  },
  sliders: {
    name: 'sliders',
    multiFile: false,
    cacheKey: 'sliders-data',
    cacheTime: 60000,
  },
  projects: {
    name: 'projects',
    multiFile: true,
    cacheKey: 'projects-data',
    cacheTime: 60000,
  },
  techstack: {
    name: 'techstack',
    multiFile: false,
    cacheKey: 'techstack-data',
    cacheTime: 60000,
  },
  profile: {
    name: 'profile',
    multiFile: true,
    cacheKey: 'profile-data',
    cacheTime: 60000,
  },
  techCategory: {
    cacheKey: 'techCategory-data',
    cacheTime: 60000,
  },
  certificate: {
    name: 'certificate',
    multiFile: false,
    cacheKey: 'certificate-data',
    cacheTime: 60000,
  },
};

export default uploadVariables;
