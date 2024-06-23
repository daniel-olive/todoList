type Props = {
    title: string;
    success?: string;
    danger?: string;
};
export const MsgConfirm = ({ title, success, danger }: Props) => {
    return (
        <div className={`p-3 rounded-md text-center border-2 ${success} ${danger}`}>
            <span className={`${success} ${danger}`}>{title}</span>
        </div>
    );
};
