import {
  exists,
  readFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

export const fileExists = async ({
  path,
  baseDir,
}: {
  path: string;
  baseDir?: BaseDirectory;
}) => {
  try {
    const doesExists = await exists(path, { baseDir });
    return doesExists;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const readFileContent = async ({
  path,
  baseDir,
}: {
  path: string;
  baseDir?: BaseDirectory;
}) => {
  try {
    const fileContent = await readFile(path, { baseDir });
    const decoder = new TextDecoder();
    return decoder.decode(fileContent);
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const writeFileContent = async ({
  path,
  content,
  baseDir,
}: {
  path: string;
  content: string;
  baseDir?: BaseDirectory;
}) => {
  try {
    console.log("path : ", path);
    await writeTextFile(path, content, { baseDir });
    
  } catch (err) {
    console.log("Error writing file : ", err);
    return false;
  }
};
