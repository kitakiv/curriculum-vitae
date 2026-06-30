import { Chip } from '@mui/material'
import ShieldIcon from '@mui/icons-material/Shield'
import MiddleText from '@/components/text/MiddleText'
import SmallText from '@/components/text/SmallText'

interface Props {
    name: string,
    id: string,
    affectedElements: string[],
    affectedElementsName: string
}

export default function AffectedElements({ name, id, affectedElements, affectedElementsName }: Props) {

    return (
        <div className="bg-gradiment-to-br from-transparent to-adminGr100 rounded-lg p-6 border border-amdinGr33">
            <div className="flex items-center gap-3 mb-4">
                <ShieldIcon className="text-red-600" sx={{ fontSize: 28 }} />
                <div>
                    <MiddleText tailwind="text-adminTx">{name}</MiddleText>
                    <SmallText tailwind="text-adminTx100">ID: {id}</SmallText>
                </div>
            </div>

            {affectedElements && affectedElements.length > 0 && (
                <div className="mb-4 p-3 bg-gradient-to-r from-adminGr0 to-adminGr100 border border-adminGr33 rounded-lg">
                    <SmallText tailwind="text-adminTx font-medium">
                        Affected {affectedElementsName}: {affectedElements.length}
                    </SmallText>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {affectedElements.slice(0, 5).map((elem) => (
                            <div
                                key={elem}

                                className="rounded-full px-4 py-1 text-adminTx text-center bg-transparent border border-adminGr33"
                            >
                                <SmallText>{elem}</SmallText>
                            </div>
                        ))}
                        {affectedElements.length > 5 && (   
                            <div
                                key={affectedElements.length}

                                className="rounded-full px-4 py-1 text-adminTx text-center bg-transparent border border-adminGr33"
                            >
                                <SmallText>{`+${affectedElements.length - 5} more`}</SmallText>
                            </div>

                        )}
                    </div>
                </div>
            )}
        </div>
    )
}