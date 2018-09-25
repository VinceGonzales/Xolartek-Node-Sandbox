import * as http from 'http';
import * as url from "url";
import * as fs from "fs";
import * as path from "path";

export class WebService {
	private header: http.OutgoingHttpHeaders = {'Content-Type': 'text/html'};
	private response:http.ServerResponse;

	constructor() { }

	public start(port: number): void {
		var server: http.Server = http.createServer(this.onRequest);
		server.listen(port);
		console.log(`Server started at: localhost:${port}`);
	}

	private onRequest(request:http.ServerRequest, response:http.ServerResponse): void {
		this.response = response;
		var q: url.UrlWithParsedQuery = url.parse(request.url, true);
		var filename: string = path.join(__dirname, ".." + q.pathname);
		console.log("HTTP Request: ", filename);
		if (filename.indexOf("htm") >= 0) {
			var content: string = fs.readFileSync(filename, 'utf8');
			this.response.writeHead(200, this.header);
			this.response.write(content);
			this.response.end();
		}
	}
}
