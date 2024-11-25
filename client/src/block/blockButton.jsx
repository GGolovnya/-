import { Card } from "@nextui-org/react";
import { MyButton } from '../button/MyButton'

export function BlockButton() {
    return (
      <Card className = "flex-grow mx-auto px-24 py-24 gap-4">
            <MyButton/>
            <MyButton/>
            <MyButton/>
      </Card>
    );
  }