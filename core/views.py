from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from .models import User, Post, Comment

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            
            user = User.objects.create_user(username=username, password=password)
            login(request, user)
            return redirect('home')

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')

    return render(request, 'core/login.html')

from django.core.paginator import Paginator

@login_required
def home(request):
    if request.method == 'POST':
        content = request.POST.get('content', '')
        image = request.FILES.get('image')
        if content or image:
            Post.objects.create(user=request.user, content=content, image=image)
            return redirect('home')

    posts = Post.objects.all()
    paginator = Paginator(posts, 20)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    
    if request.headers.get('HX-Request'):
        return render(request, 'core/posts_list.html', {'posts': page_obj})
    
    users = User.objects.all()
    return render(request, 'core/home.html', {
        'posts': page_obj,
        'users': users,
        'has_next': page_obj.has_next(),
        'next_page': page_obj.next_page_number() if page_obj.has_next() else None
    })

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def follow_view(request, username):

    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST'])
    

    to_follow = get_object_or_404(User, username=username)

    if request.user != to_follow:
        if request.user in to_follow.followers.all():
            to_follow.followers.remove(request.user)
        else:
            to_follow.followers.add(request.user)

    return HttpResponse('ok')

@login_required
def post_detail(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    users = User.objects.all()
    return render(request, 'core/post_detail.html', {
        'post': post,
        'users': users
    })

@login_required
def like_post(request, post_id):
    if request.method == 'POST':
        post = get_object_or_404(Post, id=post_id)
        if request.user in post.likes.all():
            post.likes.remove(request.user)
            liked = False
        else:
            post.likes.add(request.user)
            liked = True
        return JsonResponse({
            'liked': liked,
            'likes_count': post.get_likes_count()
        })
    return HttpResponseNotAllowed(['POST'])

@login_required
def add_comment(request, post_id):
    if request.method == 'POST':
        post = get_object_or_404(Post, id=post_id)
        content = request.POST.get('content')
        image = request.FILES.get('image')
        if content or image:
            Comment.objects.create(
                post=post,
                user=request.user,
                content=content,
                image=image
            )
        return redirect('post_detail', post_id=post_id)
    return HttpResponseNotAllowed(['POST'])

@login_required
def like_comment(request, comment_id):
    if request.method == 'POST':
        comment = get_object_or_404(Comment, id=comment_id)
        if request.user in comment.likes.all():
            comment.likes.remove(request.user)
            liked = False
        else:
            comment.likes.add(request.user)
            liked = True
        return JsonResponse({
            'liked': liked,
            'likes_count': comment.get_likes_count()
        })
    return HttpResponseNotAllowed(['POST'])

@login_required
def profile_view(request, username):
    try:
        profile_user = User.objects.get(username=username)
    except User.DoesNotExist:
        return redirect('home')

    if request.method == 'POST':
        
        if 'new_username' in request.POST and request.user == profile_user:
            new_username = request.POST['new_username']
            if User.objects.filter(username=new_username).exists():
                return redirect('profile', username=username)
            profile_user.username = new_username
            profile_user.save()
            return redirect('profile', username=new_username)
        
        elif 'short_bio' in request.POST and request.user == profile_user:
            profile_user.short_bio = request.POST['short_bio'][:60]
            profile_user.save()
            return redirect('profile', username=username)

        elif 'avatar' in request.FILES and request.user == profile_user:
            file = request.FILES['avatar']
            from django.core.files.storage import default_storage
            filepath = default_storage.save(f'avatars/{file.name}', file)
            profile_user.avatar = default_storage.url(filepath)
            profile_user.save()
            return redirect('profile', username=username)

    posts = Post.objects.filter(user=profile_user)
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    
    if request.headers.get('HX-Request'):
        return render(request, 'core/posts_list.html', {'posts': page_obj})
    
    users = User.objects.all()
    return render(request, 'core/profile.html', {
        'profile_user': profile_user,
        'posts': page_obj,
        'users': users,
        'is_own_profile': request.user == profile_user,
        'has_next': page_obj.has_next(),
        'next_page': page_obj.next_page_number() if page_obj.has_next() else None
    })

@login_required
def edit_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.user != post.user:
        return redirect('home')
        
    if request.method == 'POST':
        content = request.POST.get('content')
        image = request.FILES.get('image')
        if content or image:
            post.content = content
            if image:
                post.image = image
            post.save()
        return JsonResponse({'success': True, 'content': content})
    return HttpResponseNotAllowed(['POST'])

@login_required
def delete_post(request, post_id):
    if request.method == 'POST':
        post = get_object_or_404(Post, id=post_id)
        if request.user == post.user:
            post.delete()
        return redirect('home')
    return HttpResponseNotAllowed(['POST'])
