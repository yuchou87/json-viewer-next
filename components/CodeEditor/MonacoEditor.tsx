'use client';
import { ModeEnum } from '@/lib/constant';
import { MonacoTheme } from '@/types/editor';
import Editor, { OnMount } from '@monaco-editor/react';

type Props = {
  mode: ModeEnum;
  value?: string;
  theme?: MonacoTheme;
  onMount?: OnMount;
}

export default function MonacoEditor(
  {
    mode,
    value,
    onMount,
    theme
  }: Props) {
  return (
    <>
      {
        mode === ModeEnum.Editor ? (
          <Editor
            value={value}
            theme={theme}
            defaultLanguage='json'
            onMount={onMount}
          />
        ) : null
      }
    </>
  )
}