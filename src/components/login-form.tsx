"use client";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Key, Mail, UserRound} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";

const formSchema = z.object({
    email: z.string().email({
        message: "Введите корректную почту"
    }),
    password: z.string().min(10, {
        message: "Минимальная длина пароля 10 символов"
    }),
});

const LoginForm: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await signIn("login", {...values, callbackUrl: "/calendar", redirect: true});
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
                <FormField control={form.control} render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input startIcon={Mail} placeholder="Электронная почта"
                                   type="email" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} name="email"/>
                <FormField control={form.control} render={({field}) => (
                    <FormItem>
                        <FormControl>
                            <Input startIcon={Key} placeholder="Пароль" type="password" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} name="password"/>
                <Button className="bg-[#224A88] hover:bg-blue-900 active:bg-blue-950 self-center"
                        type="submit">Войти</Button>
            </form>
        </Form>
    )
};

export default LoginForm;