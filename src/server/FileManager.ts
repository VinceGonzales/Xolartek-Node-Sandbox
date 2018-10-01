import * as fs from "fs";
import * as path from "path";

export class FileManager {
	constructor() {}
	public loadDirectory(dir: string): void {
		var filepath: string = path.join(__dirname, dir);
		fs.readdir(filepath, this.processFile);
	}
	public copyDirContent(startPath:string): void {
		var filepath: string = path.join(__dirname, startPath);
		if (!fs.existsSync(filepath)) {
			console.log("no directory: ", startPath);
			return;
		}
		fs.readdir(filepath, (err:NodeJS.ErrnoException, files: string[]): void => {
			for (var file of files) {
				var b: string = path.join(filepath, "../../dist/" + file);
				try {
					fs.accessSync(b, fs.constants.R_OK | fs.constants.W_OK);
					console.log('Exists: ', file);
				} catch (err) {
					var a: string = path.join(filepath, file);
					var source: fs.ReadStream = fs.createReadStream(a);
					var dest: fs.WriteStream = fs.createWriteStream(b);
					source.pipe(dest);
					console.log(`copied file from ${a} to ${b}`);
				}
			}
		});
	}
	private processFile(err:NodeJS.ErrnoException, items: string[]): void {
		var filepath: string = path.join(__dirname, "../");
		for (var item of items) {
			var f: string = path.join(filepath, item);
			fs.stat(f, (err:NodeJS.ErrnoException, stats: any): void => {
				console.log(`${item} is ${stats.isFile() ? 'a file' : 'a directory'}`);
			});
		}
		console.log("processing...");
	}
}