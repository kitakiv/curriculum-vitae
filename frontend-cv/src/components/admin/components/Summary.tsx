
interface SummaryElements {
    text: string;
    lable: string;
    size: string;
    color: string
}


export default function Summary({ summary, heading }: { summary: SummaryElements[]; heading: string }) {
    return (
        <div className="mt-12 p-6 w-full liquidGlass-elem">
                    <h3 className="font-semibold text-adminTx mb-4 text-lg">{heading}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {
                            summary.map((item, index) => (
                                <div key={`${item.text}-${index}`} className="p-4 bg-gradient-to-br from-adminGr50 to-adminGr100 rounded-lg border-adminTx border-[1px]">
                                    <p className={`${item.color} text-sm text-adminTx100`}>{item.text}</p>
                                    <p className={`text-2xl text-adminTx100 font-bold ${item.size === 'large' ? 'text-3xl' : item.size === 'medium' ? 'text-xl' : 'text-base'} mt-1 `}>{item.lable}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
    )
}