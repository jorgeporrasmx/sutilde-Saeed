import os
import json
import re
from http.server import BaseHTTPRequestHandler

def get_articles():
    try:
        articles_dir = os.path.join(os.getcwd(), 'articles')
        items = []
        if os.path.isdir(articles_dir):
            for name in sorted(os.listdir(articles_dir)):
                if not name.lower().endswith('.html'):
                    continue
                file_path = os.path.join(articles_dir, name)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    # Extract basic metadata
                    title_match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
                    category_match = re.search(r'<span[^>]*class=["\']blog-category["\'][^>]*>(.*?)</span>', content, re.IGNORECASE | re.DOTALL)
                    # First paragraph after metadata
                    excerpt_match = re.search(r'<p>(.*?)</p>', content, re.IGNORECASE | re.DOTALL)
                    date_match = re.search(r'<i[^>]*fa-calendar[^>]*></i>\s*([^<]+)', content, re.IGNORECASE)

                    def clean_html(text):
                        if not text:
                            return ''
                        return re.sub(r'<[^>]+>', '', text).strip()

                    items.append({
                        'file': name,
                        'path': f'articles/{name}',
                        'title': clean_html(title_match.group(1) if title_match else os.path.splitext(name)[0]),
                        'category': clean_html(category_match.group(1) if category_match else ''),
                        'excerpt': clean_html(excerpt_match.group(1) if excerpt_match else ''),
                        'date': clean_html(date_match.group(1) if date_match else ''),
                    })
                except Exception:
                    # Skip problematic files without breaking the list
                    continue
        return items
    except Exception as e:
        return {'error': str(e)}

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/articles':
            try:
                items = get_articles()
                payload = json.dumps(items, ensure_ascii=False).encode('utf-8')
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                self.send_header('Access-Control-Allow-Headers', 'Content-Type')
                self.send_header('Content-Length', str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)
            except Exception as e:
                error = json.dumps({'error': str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-Length', str(len(error)))
                self.end_headers()
                self.wfile.write(error)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers() 