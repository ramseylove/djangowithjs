from django.http import JsonResponse
from django.shortcuts import render
# from django.core import serializers
from .models import Posts


def post_list_and_create(request):
    qs = Posts.objects.all()
    return render(request, 'posts/main.html', {'qs': qs})

# will get error that posts can not be serialized
# def load_posts_json_view(request):
#     qs = Posts.objects.all()
#     return JsonResponse({'qs': qs})


def load_posts_json_view(request, num_posts):
    visible = 3
    upper = num_posts
    lower = upper - visible
    size = Posts.objects.all().count()

    qs = Posts.objects.all()
    # creates serialized response but foreign keys are listed as Ids only
    # posts = serializers.serialize('json', qs)

    posts = []
    for post in qs:
        item = {
            'id': post.id,
            'title': post.title,
            'body': post.body,
            'liked': True if request.user in post.liked.all() else False,
            'author': post.author.user.username,
        }
        posts.append(item)
    return JsonResponse({'posts': posts[lower:upper], 'size': size})


def hello_world_view(request):
    return JsonResponse({'text': 'Hello World View'})
