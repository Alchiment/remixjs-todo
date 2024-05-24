interface NormalTitlePropsInterface {
    title: string;
}

export default function NormalTitle({ title }: NormalTitlePropsInterface) {
    return (
        <h1 className="title--normal">
            {title}
        </h1>
    );
}
