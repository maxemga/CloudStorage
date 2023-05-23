import { colors } from '../colors'
import { Fonts } from '../fonts'
import { metrics } from '../metrics'

export const LightTheme = {
  ...Fonts,
  ...colors,
  ...metrics,
  background: {
    auth: colors.violet[1],
    // auth: colors.grey[0],

    // home: colors.grey[0],
    home: colors.violet[1],
    sidebar: colors.grey[5],
    filesList: colors.white,
    popup: colors.white,
    overlay: colors.black[0],
  },
  auth: {
    background: colors.white,
    forgot: colors.violet[0],
  },
  home: {
    header: {
      input: {
        placeholder: colors.grey[6],
        background: {
          primary: colors.white,
        },
        icons: {
          active: colors.black[1],
          inactive: colors.grey[6],
        },
      },
    },
    panel: {
      background: colors.black[1],
      tool: colors.white,
    },
    sidebar: {
      nav: {
        background: colors.grey[8],
        icon: colors.grey[7],
      },
      uploadButton: {
        text: colors.white,
        background: colors.violet[0],
        hover: colors.violet[2],
      },
      createButton: {
        text: colors.black[0],
        background: colors.white,
        hover: colors.grey[4],
      },
    },
    list: {
      item: {
        background: colors.violet[1],
        mediaBorder: colors.grey[2],
      },
      header: {
        item: colors.grey[3],
        hover: colors.black[0],
      },
    },
    modal: {
      icon: colors.grey[3],
      border: colors.grey[2],
    },
  },
  uploader: {
    confirm: colors.grey[2],
    loader: {
      field: colors.grey[1],
      fillField: colors.violet[0],
    },
    header: {
      primary: colors.black[2],
      loading: colors.violet[0],
      success: colors.green,
      error: colors.red,
    },
    item: {
      hover: colors.grey[10],
    },
  },
  icons: {
    primary: colors.white,
    folder: {
      main: colors.violet[0],
      second: colors.blue[2],
    },
  },
  input: {
    border: {
      primary: colors.grey[1],
      error: colors.red,
      focus: colors.violet[0],
      pale: colors.grey[2],
    },
    hover: colors.grey[2],
    helper: {
      primary: colors.grey[3],
      error: colors.red,
      focus: colors.violet[0],
    },
  },
  text: {
    primary: colors.black[0],
    subtitle: colors.grey[9],

    white: colors.white,
    error: colors.red,
  },
  button: {
    tool: colors.white,
    form: {
      primary: colors.violet[0],
      disabled: colors.violet[1],
      hover: colors.grey[2],
    },
    text: {
      form: colors.white,
      navigate: colors.violet[0],
    },
  },
  loader: {
    primary: colors.blue[0],
    secondary: colors.blue[1],
  },
  popup: {
    background: colors.white,
    border: colors.grey[1],
    hover: colors.grey[4],
  },
}
