from django.urls import path
from .views import (
    post_list_and_create,
    hello_world_view,
    load_posts_json_view,
)

app_name = 'posts'

urlpatterns = [
    path('', post_list_and_create, name='main-page'),
    path('json-posts/<int:num_posts>/', load_posts_json_view, name='json-posts'),
    path('hello/', hello_world_view, name='hello')
]