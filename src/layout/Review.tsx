import { Quote } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const reviews = [
  {
    name: "Alex Bob",
    position: "Lead Developer, Innovate",
    quote: "ContentVerse simplified our content management workflow. It's intuitive and powerful.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHBlb3BsZSUyMHBob3RvcyUyMGNvdmVyJTIwc2l6ZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Emma Hurray",
    position: "CTO, Hub",
    quote: "The flexibility of this headless CMS is incredible. We integrated it seamlessly across multiple platforms.",
    avatar: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBlb3BsZSUyMHBob3RvcyUyMGNvdmVyJTIwc2l6ZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Jordan Haskell",
    position: "Product Manager, Techsolutions",
    quote: "Game-changing tool. Our content team loves the simplicity, and our developers appreciate the robust API.",
    avatar: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const UserReviews = () => {
  return (
    <section className="bg-background/5 rounded-2xl p-2 m-2">
      <h2 className="text-3xl font-semibold text-center mb-8 
        bg-gradient-to-r from-primary to-purple-500 
        text-transparent bg-clip-text">
        What Our Users Say
      </h2>
      <div className="grid md:grid-cols-3 gap-3">
        {reviews.map((review, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-shadow duration-300 
              border-border/50 hover:border-primary/30"
          >
            <CardHeader className="flex flex-row items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={review.avatar} alt={review.name} className="object-cover" />
                <AvatarFallback>{review.name.slice(0,2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.position}</p>
              </div>
            </CardHeader>
            <CardContent className="italic relative pl-6">
              <Quote className="absolute left-0 top-0 text-primary/30 w-4 h-4" />
              "{review.quote}"
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UserReviews;