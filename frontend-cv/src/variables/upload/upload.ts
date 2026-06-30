
enum HTTPMETHOD {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS'
}

enum UPLOADTYPE {
    FILE = 'File',
    FILES = 'Files'
};

enum UPLOADSERVICE {
    CONTACTS = 'contacts',
    SLIDERS = 'sliders',
    PROJECTS = 'projects',
    TECHSTACK = 'techstack',
    PROFILE = 'profile',
    CERTIFICATE = 'certificate',
}

const uploadVariables = {
  [UPLOADSERVICE.CONTACTS]: {
    name: UPLOADSERVICE.CONTACTS,
    multiFile: false,
  },
  [UPLOADSERVICE.SLIDERS]: {
    name: UPLOADSERVICE.SLIDERS,
    multiFile: false,
  },
  [UPLOADSERVICE.PROJECTS]: {
    name: UPLOADSERVICE.PROJECTS,
    multiFile: true,
  },
  [UPLOADSERVICE.TECHSTACK]: {
    name: UPLOADSERVICE.TECHSTACK,
    multiFile: false,
  },
  [UPLOADSERVICE.PROFILE]: {
    name: UPLOADSERVICE.PROFILE,
    multiFile: true,
  },
  [UPLOADSERVICE.CERTIFICATE]: {
    name: UPLOADSERVICE.CERTIFICATE,
    multiFile: false,
  },
};

export { uploadVariables, HTTPMETHOD, UPLOADTYPE, UPLOADSERVICE };
