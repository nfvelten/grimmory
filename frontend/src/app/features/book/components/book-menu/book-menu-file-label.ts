import {type BookFileResponse} from '../../data/book-response.models';

export interface BookFileLabelParts {
  base: string;
  suffix: string;
  full: string;
}

export function bookFileLabelParts(file: BookFileResponse): BookFileLabelParts {
  const name = file.fileName ?? file.bookType ?? '';
  const ext = (file.extension ?? '').trim();
  const size = fileSizeLabel(file.fileSizeKb);

  let base = name;
  if (ext && base.toLowerCase().endsWith(`.${ext.toLowerCase()}`)) {
    base = base.slice(0, -(ext.length + 1));
  }

  const extensionSuffix = ext ? `.${ext}` : '';
  const sizeSuffix = size ? ` (${size})` : '';
  const suffix = `${extensionSuffix}${sizeSuffix}`;
  const full = `${base}${suffix}`.trim();
  return {base: base || name, suffix, full: full || name};
}

function fileSizeLabel(fileSizeKb: number | undefined): string | null {
  if (fileSizeKb == null) {
    return null;
  }
  const units = ['KB', 'MB', 'GB', 'TB'];
  let size = fileSizeKb;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  let decimals: number;
  if (size >= 100) {
    decimals = 0;
  } else if (size >= 10) {
    decimals = 1;
  } else {
    decimals = 2;
  }
  return `${size.toFixed(decimals)} ${units[unit]}`;
}
