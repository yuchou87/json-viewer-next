export enum ModeEnum { 
  Editor = 'editor',
  Viewer = 'viewer',
  Diff = 'diff',
};

export const defaultPlaceHolder = `{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "555-555-5555"
    },
    {
      "type": "work",
      "number": "555-555-5556"
    }
  ]
}`;

export const defaultThemes = ['Light', 'Dark'];

export const EditorEnum = {
  CodeMirror: 'CodeMirror',
  Monaco: 'Monaco',
};

export const defaultEditors = [EditorEnum.CodeMirror, EditorEnum.Monaco];