'use client';
import CodeMirrorEditor from "@/components/CodeEditor/CodeMirrorEditor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { defaultEditors, defaultPlaceHolder, defaultThemes, EditorEnum, ModeEnum } from "@/lib/constant";
import { useCallback, useEffect, useRef, useState } from "react";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { OnChange, Theme, MonacoTheme, ThemeEnum } from "@/types/editor";
import MonacoEditor from "@/components/CodeEditor/MonacoEditor";
import { OnMount } from "@monaco-editor/react";
import { editor } from 'monaco-editor';

export default function Home() {
  const { toast } = useToast();
  const [value, setValue] = useState<string>(defaultPlaceHolder);
  const [theme, setTheme] = useState<string>(ThemeEnum.Light);
  const [editor, setEditor] = useState<string>(EditorEnum.CodeMirror);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const onChange: OnChange = (val, viewUpdate) => {
    console.log(`ViewUpdate: ${viewUpdate}`);
    setValue(val);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    console.log(`editorDidMount, editor: ${editor}, monaco: ${monaco}, theme: ${theme}`);
    editorRef.current = editor;
    monaco.editor.setTheme(theme);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatJson = useCallback((_: any, replacer: number = 2) => {
    try {
      if (value) {
        const obj = JSON.parse(value);
        setValue(JSON.stringify(obj, null, replacer));
      }
    } catch (error) {
      console.error(error);
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your input.",
          action: <ToastAction altText="Try again" onClick={() => setValue("")}>Try again</ToastAction>,
      })
    }
  }, [value, toast]);

  const handleThemeChange = (value: string) => {
    console.log(`editor: ${editor}, theme: ${value}`);
    let newValue = value;
    if (editor === EditorEnum.CodeMirror) {
      newValue = value === ThemeEnum.VsDark ? ThemeEnum.Dark : value;
      document.documentElement.setAttribute('data-color-mode', newValue === ThemeEnum.VsDark ? ThemeEnum.Dark : newValue);
    }
    if (editor === EditorEnum.Monaco) {
      newValue = value === ThemeEnum.Dark ? ThemeEnum.VsDark : value;
    }
    setTheme(newValue);
  };

  const handleEditorChange = (value: string) => {
    console.log(`editor: ${value}, theme: ${theme}`);
    setEditor(value);
  }

  useEffect(() => {
    console.log(`editor: ${editor}, theme: ${theme}`);
    handleThemeChange(theme);
  }, [theme, editor]);

  return (
    <div>
      <div className="flex gap-4 bg-gray-100 p-1 items-center">
        <h1 className="text-xl">JSON Viewer</h1>
        <Select
          defaultValue={EditorEnum.CodeMirror}
          onValueChange={(value) => handleEditorChange(value)}
        >
          <SelectTrigger id="editor" className="w-[120px]" >
            <SelectValue placeholder="Select editor"/>
          </SelectTrigger>
          <SelectContent>
            {
              defaultEditors.map((editor) => (
                <SelectItem value={editor} key={editor}>{editor}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <Select
          defaultValue="Light"
          onValueChange={(value) => handleThemeChange(value.toLowerCase() as Theme)}
        >
          <SelectTrigger id="theme" className="w-[120px]" >
            <SelectValue placeholder="Select theme"/>
          </SelectTrigger>
          <SelectContent>
            {
              defaultThemes.map((theme) => (
                <SelectItem value={theme} key={theme}>{theme}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={formatJson}
        >
          Format
        </Button>
        <Button
          variant="outline"
          onClick={() => formatJson(null, 0)}
        >
          Compress
        </Button>
      </div>
      <Separator />
      <div className="h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            {
              editor === EditorEnum.Monaco ? (
                <MonacoEditor
                  mode={ModeEnum.Editor}
                  value={value}
                  theme={theme as MonacoTheme}
                  onMount={handleEditorDidMount}
                />
              ) : (
                <CodeMirrorEditor
                  mode={ModeEnum.Editor}
                  value={value}
                  onChange={onChange}
                  theme={theme as Theme}
                />
              )
            }
          </ResizablePanel>
        <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            {
              editor === EditorEnum.Monaco ? (
                <MonacoEditor
                  mode={ModeEnum.Viewer}
                  value={value}
                  theme={theme as MonacoTheme}
                />
              ) : (
                <CodeMirrorEditor
                  mode={ModeEnum.Viewer}
                  value={value}
                  theme={theme as Theme}
                />
              )
            }
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
