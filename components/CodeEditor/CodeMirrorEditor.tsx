'use client';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { json as jsonLang } from '@codemirror/lang-json';
import { ModeEnum } from '@/lib/constant';

type Props = {
  mode: ModeEnum;
  value?: string;
  theme?: 'light' | 'dark' | 'none';
  onChange?: (value: string, viewUpdate: ViewUpdate) => void;
}

export default function CodeMirrorEditor({ mode, value, onChange,theme }: Props) {
  return (
    <CodeMirror
        value={value}
        height="100%"
        style={{
          height: '100%'
        }}
        extensions={[jsonLang()]}
        onChange={onChange}
        editable={mode === ModeEnum.Editor}
        theme={theme}
      />
  );
}