from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        user = super().save_user(request, user, form, False)

        user_or_critic = data.get("user_or_critic")
        if user_or_critic:
            user.user_or_critic = user_or_critic

        foreign_or_domestic = data.get("foreign_or_domestic")
        if foreign_or_domestic:
            user.foreign_or_domestic = foreign_or_domestic

        user.save()
        return user