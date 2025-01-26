import { CandlestickChartIcon as ChartCandlestick, Hammer, Headset } from "lucide-react"

function Features() {
  const features = [
    {
      icon: ChartCandlestick,
      title: "Advanced Analytics",
      description: "Access analytics for your business in one place",
    },
    {
      icon: Hammer,
      title: "Premium Support",
      description: "Receive timely assistance and escalations with our premium support",
    },
    {
      icon: Headset,
      title: "Premium+ All or",
      description: "All organizations and affiliates get Premium+ with access to Grok 2.0.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-center font-bold text-3xl mb-8 ">More Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className=" flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <div className=" mb-4">
              <feature.icon absoluteStrokeWidth/>
            </div>
            <h4 className="font-semibold text-xl mb-2 ">{feature.title}</h4>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features

