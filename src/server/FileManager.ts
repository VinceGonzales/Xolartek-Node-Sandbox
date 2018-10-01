import * as fs from "fs";
import * as path from "path";

export class FileManager {
	constructor() {}
	public checkFile(filename:string): boolean {
		var result: boolean = false;
		fs.access(filename, fs.constants.F_OK, (err) => {
			return err;
		});
		return result;
	}
	public copyDirContent(startPath:string): void {
		var filepath: string = path.join(__dirname, startPath);
		if (!fs.existsSync(filepath)) {
			console.log("no dir ", startPath);
			return;
		}
		fs.readdir(filepath, (err:NodeJS.ErrnoException, files: string[]): void => {
			for (var file of files) {
				var a: string = path.join(filepath, file);
				var b: string = path.join(filepath, "../../dist/" + file);
				var source: fs.ReadStream = fs.createReadStream(a);
				var dest: fs.WriteStream = fs.createWriteStream(b);
				source.pipe(dest);
				console.log(`copied file from ${a} to ${b}`);
			}
		});
	}
}