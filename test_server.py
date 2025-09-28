#!/usr/bin/env python3
"""
Test server to verify index.html is working
"""
import http.server
import socketserver
import os
import threading
import time

PORT = 8001
DIRECTORY = "e:/IVS/Website/ivs/ivs.github.io"

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"✅ Test server running at http://localhost:{PORT}")
        print(f"📁 Serving files from: {DIRECTORY}")
        print(f"🔗 Test index.html: http://localhost:{PORT}/index.html")
        print(f"🔗 Test simple: http://localhost:{PORT}/hello.html")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n❌ Server stopped")

if __name__ == "__main__":
    run_server()