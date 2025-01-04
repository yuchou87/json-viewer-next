import { ViewUpdate } from "@uiw/react-codemirror";

export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
  None = 'none',
  VsDark = 'vs-dark',
}

export type Theme = ThemeEnum.Light | ThemeEnum.Dark | ThemeEnum.None;

export type MonacoTheme = ThemeEnum.VsDark | ThemeEnum.Light;

export type OnChange = (value: string, viewUpdate: ViewUpdate) => void;