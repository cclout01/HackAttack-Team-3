import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "./utils";

interface CarouselContextValue {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  itemCount: number;
  setItemCount: (count: number) => void;
}

const CarouselContext = React.createContext<CarouselContextValue>({
  currentIndex: 0,
  setCurrentIndex: () => {},
  itemCount: 0,
  setItemCount: () => {},
});

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: {
    loop?: boolean;
  };
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, opts, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [itemCount, setItemCount] = React.useState(0);

    return (
      <CarouselContext.Provider value={{ currentIndex, setCurrentIndex, itemCount, setItemCount }}>
        <div ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { currentIndex, setItemCount } = React.useContext(CarouselContext);
    
    React.useEffect(() => {
      setItemCount(React.Children.count(children));
    }, [children, setItemCount]);

    return (
      <div ref={ref} className="overflow-hidden" {...props}>
        <div
          className={cn("flex transition-transform duration-300", className)}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children}
        </div>
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-full", className)} {...props} />
  )
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { currentIndex, setCurrentIndex, itemCount } = React.useContext(CarouselContext);

    const handlePrevious = () => {
      setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : itemCount - 1);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors",
          className
        )}
        onClick={handlePrevious}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { currentIndex, setCurrentIndex, itemCount } = React.useContext(CarouselContext);

    const handleNext = () => {
      setCurrentIndex(currentIndex < itemCount - 1 ? currentIndex + 1 : 0);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors",
          className
        )}
        onClick={handleNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
