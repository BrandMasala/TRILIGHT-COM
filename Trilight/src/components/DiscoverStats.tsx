import { ReactNode } from "react"

type Stat = {
  icon: ReactNode
  value: string
  label: string
}

type DiscoverStatsProps = {
  heading: string
  description: string
  stats: Stat[]
}

const DiscoverStats = ({ heading, description, stats }: DiscoverStatsProps) => {
  return (
    <section id="discover-stats" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <h3 className="font-heading text-4xl md:text-5xl text-dark-elegant">{heading}</h3>
          <p className="font-body text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
          {stats.map((s, i) => (
            <div key={i} className={`flex flex-col items-center gap-3 ${i > 0 ? 'md:border-l md:border-border md:pl-8 md:ml-8' : ''}`}>
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                {s.icon}
              </div>
              <div className="font-heading text-3xl text-dark-elegant">{s.value}</div>
              <div className="font-body text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DiscoverStats
