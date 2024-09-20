"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical } from "lucide-react"
import { useState } from "react"
// import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"

// Define the type for our card items
type CardItem = {
    id: string
    title: string
    content: string
}

// Sample data for our cards
const card02: CardItem[] = [
    { id: "card1", title: "Card 1", content: "This is the content of card 1" },
    { id: "card2", title: "Card 2", content: "This is the content of card 2" },
    { id: "card3", title: "Card 3", content: "This is the content of card 3" },
    { id: "card4", title: "Card 4", content: "This is the content of card 4" },
]

const card01: CardItem[] = [
    { id: "card5", title: "Card 5", content: "This is the content of card 5" },
    { id: "card6", title: "Card 6", content: "This is the content of card 6" },
    { id: "card7", title: "Card 7", content: "This is the content of card 7" },
    { id: "card8", title: "Card 8", content: "This is the content of card 8" },
]

export default function Component() {
    const [cards01, setCards01] = useState(card01)
    const [cards02, setCards02] = useState(card02)

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return

        const newCards01 = Array.from(cards01)
        const newCards02 = Array.from(cards02)
        const [reorderedItem01] = newCards01.splice(result.source.index, 1)
        const [reorderedItem02] = newCards02.splice(result.source.index, 1)
        newCards01.splice(result.destination.index, 0, reorderedItem01)
        newCards02.splice(result.destination.index, 0, reorderedItem02)

        setCards01(newCards01)
        setCards02(newCards02)
    }

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Sortable Card List</h1>
            <div className="container flex flex-wrap gap-3">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="card01">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef} className="">
                                {cards01.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="list-none"
                                            >
                                                <Card>
                                                    <CardHeader className="flex flex-row items-center">
                                                        <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                                                            <GripVertical className="h-5 w-5 text-gray-500" />
                                                        </div>
                                                        <CardTitle>{card.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{card.content}</p>
                                                    </CardContent>
                                                </Card>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                    <Droppable droppableId="card01">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef} className="gap-x-4">
                                {cards02.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="list-none"
                                            >
                                                <Card>
                                                    <CardHeader className="flex flex-row items-center">
                                                        <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                                                            <GripVertical className="h-5 w-5 text-gray-500" />
                                                        </div>
                                                        <CardTitle>{card.title}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{card.content}</p>
                                                    </CardContent>
                                                </Card>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}