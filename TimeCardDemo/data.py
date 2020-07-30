import os

if __name__ == "__main__":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MYBBS.settings')  # MYBBS是你的Django项目名称
    import django

    django.setup()

    from TimeCardDemo.models import Employee

    Employee.objects.create(id=1,
                            username="a",
                            first_name="a",
                            last_name="a",
                            email='a',
                            phone='315')
