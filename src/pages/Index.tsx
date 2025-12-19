import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  topics: string[];
  rating: number;
  reviews: Review[];
}

interface VideoLesson {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  thumbnail: string;
  rating: number;
}

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'ChatGPT для бизнеса',
    description: 'Полный курс по использованию ChatGPT для автоматизации бизнес-процессов',
    price: 15900,
    duration: '8 недель',
    level: 'Начальный',
    topics: ['Промпт-инжиниринг', 'Автоматизация', 'API интеграция', 'Кейсы'],
    rating: 4.8,
    reviews: [
      {
        id: 1,
        author: 'Анна Петрова',
        avatar: 'АП',
        rating: 5,
        text: 'Отличный курс! Много практики и реальных кейсов из бизнеса.',
        date: '2024-01-15'
      },
      {
        id: 2,
        author: 'Дмитрий Козлов',
        avatar: 'ДК',
        rating: 4,
        text: 'Очень полезно для предпринимателей. Рекомендую!',
        date: '2024-01-10'
      }
    ]
  },
  {
    id: 2,
    title: 'Midjourney: от новичка до профи',
    description: 'Научитесь создавать профессиональные изображения с помощью нейросети',
    price: 12900,
    duration: '6 недель',
    level: 'Начальный',
    topics: ['Основы генерации', 'Продвинутые промпты', 'Стилизация', 'Коммерция'],
    rating: 4.9,
    reviews: [
      {
        id: 3,
        author: 'Ольга Смирнова',
        avatar: 'ОС',
        rating: 5,
        text: 'Превосходный курс! Теперь создаю изображения для своего магазина.',
        date: '2024-01-20'
      }
    ]
  },
  {
    id: 3,
    title: 'AI-инструменты для маркетолога',
    description: 'Комплексный курс по всем AI-инструментам для маркетинга и продвижения',
    price: 18900,
    duration: '10 недель',
    level: 'Средний',
    topics: ['Контент-генерация', 'Аналитика', 'Таргетинг', 'Автоворонки'],
    rating: 4.7,
    reviews: []
  }
];

const videoLessons: VideoLesson[] = [
  {
    id: 1,
    title: '10 скрытых функций ChatGPT',
    description: 'Узнайте о малоизвестных возможностях ChatGPT для повышения продуктивности',
    price: 990,
    duration: '45 мин',
    thumbnail: '🎯',
    rating: 4.9
  },
  {
    id: 2,
    title: 'Создание логотипа в Midjourney за 15 минут',
    description: 'Пошаговая инструкция по созданию профессионального логотипа',
    price: 790,
    duration: '30 мин',
    thumbnail: '🎨',
    rating: 4.8
  },
  {
    id: 3,
    title: 'Автоматизация работы с помощью Claude',
    description: 'Как использовать Claude для автоматизации рутинных задач',
    price: 890,
    duration: '40 мин',
    thumbnail: '⚡',
    rating: 4.7
  },
  {
    id: 4,
    title: 'Нейросети для создания видео',
    description: 'Обзор лучших инструментов для генерации видео контента',
    price: 1290,
    duration: '55 мин',
    thumbnail: '🎬',
    rating: 4.9
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const allTopics = [
    'ChatGPT и языковые модели',
    'Генерация изображений',
    'Видео и анимация',
    'Автоматизация бизнеса',
    'Промпт-инжиниринг',
    'AI для маркетинга',
    'Аналитика данных',
    'Голосовые технологии'
  ];

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-ai flex items-center justify-center">
                <Icon name="Brain" size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Академия Алексея Сампилова</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('courses')}
                className={`text-sm font-medium transition-colors ${
                  activeSection === 'courses' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Курсы
              </button>
              <button
                onClick={() => setActiveSection('videos')}
                className={`text-sm font-medium transition-colors ${
                  activeSection === 'videos' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Видеоуроки
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`text-sm font-medium transition-colors ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Контакты
              </button>
              <button
                onClick={() => setActiveSection('profile')}
                className={`text-sm font-medium transition-colors ${
                  activeSection === 'profile' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Профиль
              </button>
            </div>
            
            <Button className="bg-gradient-ai hover:opacity-90">
              Войти
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="space-y-20">
            <section className="text-center space-y-6 py-20">
              <div className="inline-block">
                <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                  <Icon name="Sparkles" size={14} className="mr-1" />
                  Обучение нового поколения
                </Badge>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Освойте нейросети
                <br />
                <span className="text-gradient animate-gradient">для вашего бизнеса</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Практические курсы и видеоуроки по AI-инструментам от экспертов индустрии
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-ai hover:opacity-90 neon-glow"
                  onClick={() => setActiveSection('courses')}
                >
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Выбрать курс
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveSection('videos')}>
                  <Icon name="Play" size={20} className="mr-2" />
                  Видеоуроки
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Zap', title: 'Быстрый старт', desc: 'Начните использовать AI уже после первого урока' },
                { icon: 'Target', title: 'Практика', desc: 'Реальные кейсы и задачи из бизнеса' },
                { icon: 'Award', title: 'Сертификаты', desc: 'Подтвердите свою экспертизу документом' }
              ].map((feature, i) => (
                <Card key={i} className="glass-card hover:neon-glow transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-ai flex items-center justify-center mb-4">
                      <Icon name={feature.icon as any} size={24} className="text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </section>

            <section className="glass-card p-12 rounded-2xl">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                {[
                  { value: '2500+', label: 'Студентов' },
                  { value: '15', label: 'Курсов' },
                  { value: '50+', label: 'Видеоуроков' },
                  { value: '4.8', label: 'Средний рейтинг' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'courses' && (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gradient">Наши курсы</h2>
              <p className="text-muted-foreground text-lg">
                Выберите темы, которые вас интересуют, и мы подберём идеальный курс
              </p>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Filter" size={20} />
                  Выберите интересующие темы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {allTopics.map((topic) => (
                    <div key={topic} className="flex items-center space-x-2">
                      <Checkbox
                        id={topic}
                        checked={selectedTopics.includes(topic)}
                        onCheckedChange={() => handleTopicToggle(topic)}
                      />
                      <label
                        htmlFor={topic}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {topic}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="glass-card hover:neon-glow transition-all duration-300 flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={16} />
                        {course.reviews.length} отзывов
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between pt-6 border-t">
                    <div>
                      <div className="text-2xl font-bold text-gradient">{course.price.toLocaleString()} ₽</div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-ai hover:opacity-90">
                          Записаться
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{course.title}</DialogTitle>
                          <DialogDescription>Заполните форму для записи на курс</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Имя</Label>
                            <Input
                              id="name"
                              placeholder="Ваше имя"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Телефон</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+7 (___) ___-__-__"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Комментарий</Label>
                            <Textarea
                              id="message"
                              placeholder="Расскажите о ваших целях обучения"
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                          </div>

                          {course.reviews.length > 0 && (
                            <div className="space-y-4 pt-4 border-t">
                              <h4 className="font-semibold flex items-center gap-2">
                                <Icon name="MessageSquare" size={18} />
                                Отзывы студентов
                              </h4>
                              {course.reviews.map((review) => (
                                <div key={review.id} className="glass-card p-4 space-y-2">
                                  <div className="flex items-start gap-3">
                                    <Avatar>
                                      <AvatarFallback className="bg-gradient-ai text-white">
                                        {review.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium">{review.author}</span>
                                        {renderStars(review.rating)}
                                      </div>
                                      <p className="text-sm text-muted-foreground">{review.text}</p>
                                      <span className="text-xs text-muted-foreground mt-1 block">
                                        {new Date(review.date).toLocaleDateString('ru-RU')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <Button className="w-full bg-gradient-ai hover:opacity-90">
                            Отправить заявку
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'videos' && (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gradient">Видеоуроки</h2>
              <p className="text-muted-foreground text-lg">
                Короткие практические уроки по конкретным трюкам и фишкам
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoLessons.map((video) => (
                <Card key={video.id} className="glass-card hover:neon-glow transition-all duration-300">
                  <CardHeader>
                    <div className="aspect-video bg-gradient-ai rounded-lg flex items-center justify-center text-6xl mb-4">
                      {video.thumbnail}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {video.duration}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{video.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <CardDescription className="text-sm">{video.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <div className="text-xl font-bold text-gradient">{video.price} ₽</div>
                    <Button size="sm" className="bg-gradient-ai hover:opacity-90">
                      <Icon name="Play" size={16} className="mr-1" />
                      Купить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gradient">Свяжитесь с нами</h2>
              <p className="text-muted-foreground text-lg">
                Остались вопросы? Мы всегда на связи!
              </p>
            </div>

            <Card className="glass-card">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-ai flex items-center justify-center">
                    <Icon name="Mail" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">info@ai-academy.ru</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-ai flex items-center justify-center">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Телефон</div>
                    <div className="text-muted-foreground">+7 (999) 123-45-67</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-ai flex items-center justify-center">
                    <Icon name="MessageCircle" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Telegram</div>
                    <div className="text-muted-foreground">@ai_academy_support</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gradient">Профиль</h2>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-gradient-ai text-white text-2xl">ИП</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Иван Петров</CardTitle>
                    <CardDescription>ivan@example.com</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="BookOpen" size={18} />
                    Мои курсы
                  </h3>
                  <div className="space-y-3">
                    {courses.slice(0, 2).map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-muted-foreground">Прогресс: 65%</div>
                        </div>
                        <Button size="sm" variant="outline">
                          Продолжить
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Play" size={18} />
                    Купленные видеоуроки
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {videoLessons.slice(0, 2).map((video) => (
                      <div key={video.id} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="text-2xl">{video.thumbnail}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{video.title}</div>
                          <div className="text-xs text-muted-foreground">{video.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="glass-card border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 Академия Алексея Сампилова. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;