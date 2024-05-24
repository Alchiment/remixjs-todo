interface BigTitlePropsInterface {
    title: string;
}

export default function BigTitle({ title }: BigTitlePropsInterface) {
    return (
        <h1 className="title--big">
            {title}
        </h1>
    );
}
