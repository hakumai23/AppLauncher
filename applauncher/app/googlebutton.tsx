'use client';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>;

export function GoogleButton(props: ButtonProps) {
    const handleClick = () => {
        alert('Google sign-in clicked');
    };

    return (
        <button type="button" onClick={handleClick} {...props}>
            <div className="flex items-center border-2 border-black rounded-full px-5 py-3 dark:hover:bg-gray-700 hover:bg-gray-100 cursor-pointer">
                <img src="/google.png" alt="Google Logo" className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium">Sign in with Google</span>
            </div>
        </button>
    );
}