import {
  FolderIcon,
  PdfIcon,
  RarIcon,
  ZipIcon,
  DocxIcon,
  DocIcon,
  TxtIcon,
  CssIcon,
  HtmlIcon,
  SvgIcon,
  XmlIcon,
  PsdIcon,
  Mp3Icon,
  Mp4Icon,
  AviIcon,
  MovIcon,
  PngIcon,
  JpgIcon,
} from 'src/assets'
import { FileExtensions } from 'src/enums'
import { FileModelProps } from 'src/types'

export const FileModel: FileModelProps = {
  [FileExtensions.RAR]: {
    icon: <RarIcon />,
  },
  [FileExtensions.PDF]: {
    icon: <PdfIcon />,
  },
  [FileExtensions.DIR]: {
    icon: <FolderIcon />,
  },
  [FileExtensions.ZIP]: {
    icon: <ZipIcon />,
  },
  [FileExtensions.DOC]: {
    icon: <DocIcon />,
  },
  [FileExtensions.DOCX]: {
    icon: <DocxIcon />,
  },
  [FileExtensions.TXT]: {
    icon: <TxtIcon />,
  },
  [FileExtensions.CSS]: {
    icon: <CssIcon />,
  },
  [FileExtensions.HTML]: {
    icon: <HtmlIcon />,
  },
  [FileExtensions.SVG]: {
    icon: <SvgIcon />,
  },
  [FileExtensions.XML]: {
    icon: <XmlIcon />,
  },
  [FileExtensions.PSD]: {
    icon: <PsdIcon />,
  },
  [FileExtensions.MP3]: {
    icon: <Mp3Icon />,
  },
  [FileExtensions.MP4]: {
    icon: <Mp4Icon />,
  },
  [FileExtensions.AVI]: {
    icon: <AviIcon />,
  },
  [FileExtensions.MOV]: {
    icon: <MovIcon />,
  },
  [FileExtensions.JPG]: {
    icon: <JpgIcon />,
  },
  [FileExtensions.PNG]: {
    icon: <PngIcon />,
  },
}
