'use client';
import CodeMirrorEditor from "@/components/CodeEditor/CodeMirrorEditor";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { defaultPlaceHolder, defaultThemes, ModeEnum } from "@/lib/constant";
import { useCallback, useEffect, useState } from "react";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewUpdate } from "@uiw/react-codemirror";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Theme } from "@/types/theme";

export default function Home() {
  const { toast } = useToast();
  const [value, setValue] = useState<string>(defaultPlaceHolder);
  const [theme, setTheme] = useState<'light' | 'dark' | 'none'>("light");

  const onChange = (val: string, viewUpdate: ViewUpdate) => {
    console.log(`ViewUpdate: ${viewUpdate}`);
    setValue(val);
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

  const handleThemeChange = (value: Theme) => {
    console.log(`theme: ${value}`);
    setTheme(value);
    document.documentElement.setAttribute('data-color-mode', value);
  };

  useEffect(() => {
    console.log(`theme: ${theme}`);
  }, [theme]);

  return (
    <div>
      <div className="flex gap-4 bg-gray-100 p-1 items-center">
        <h1 className="text-xl">JSON Viewer</h1>
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
            <CodeMirrorEditor
              mode={ModeEnum.Editor}
              value={value}
              onChange={onChange}
              theme={theme}
            />
          </ResizablePanel>
        <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <CodeMirrorEditor
              mode={ModeEnum.Viewer}
              value={value}
              theme={theme}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
