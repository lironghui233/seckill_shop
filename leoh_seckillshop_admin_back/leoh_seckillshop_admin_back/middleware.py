

class FixUnderscoreHostMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # 获取原始 Host 头
        original_host = request.META.get('HTTP_HOST', '')
        if '_' in original_host:
            # 替换下划线为连字符，并移除端口号（可选）
            new_host = original_host.replace('_', '-').split(':')[0]
            request.META['HTTP_HOST'] = new_host
        return self.get_response(request)