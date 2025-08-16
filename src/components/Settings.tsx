import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { FormSection, FormRow, FormHint } from "@/components/ui/form-layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Gift, Mail, Copy, Users, Coins, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const referralSchema = z.object({
  email: z.string().email("Digite um email válido"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
});

type ReferralFormData = z.infer<typeof referralSchema>;

const Settings = () => {
  const [referralCode] = useState("CHEF123"); // Em um app real, isso viria da API
  const [totalCredits] = useState(150); // Em um app real, isso viria da API
  const [referralsCount] = useState(3); // Em um app real, isso viria da API
  const { toast } = useToast();

  const form = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = (data: ReferralFormData) => {
    // Em um app real, isso faria uma chamada para a API
    console.log("Indicação enviada:", data);
    toast({
      title: "Indicação enviada!",
      description: `Convite enviado para ${data.name} (${data.email}). Você receberá 50 créditos quando ele se cadastrar!`,
    });
    form.reset();
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Código copiado!",
      description: "Seu código de indicação foi copiado para a área de transferência.",
    });
  };

  const copyReferralLink = () => {
    const link = `https://seuapp.com/convite/${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "Seu link de indicação foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{totalCredits}</p>
                <p className="text-sm text-muted-foreground">Créditos Totais</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold text-accent">{referralsCount}</p>
                <p className="text-sm text-muted-foreground">Indicações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-secondary-foreground" />
              <div>
                <p className="text-2xl font-bold text-secondary-foreground">{referralsCount * 50}</p>
                <p className="text-sm text-muted-foreground">Créditos Ganhos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Indicação */}
      <FormSection 
        title="Indique e Ganhe Créditos"
        description="Indique amigos e ganhe 50 créditos para cada pessoa que se cadastrar!"
        icon={<Leaf className="h-5 w-5 text-primary" />}
      >
        <FormRow columns={1}>
          {/* Seu código de indicação */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Seu Código de Indicação</Label>
            <div className="flex gap-2">
              <Input 
                value={referralCode} 
                readOnly 
                className="flex-1 font-mono text-center text-lg font-bold bg-muted/50 border-2 border-primary/20"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={copyReferralCode}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Link de indicação */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Link de Indicação</Label>
            <div className="flex gap-2">
              <Input 
                value={`https://seuapp.com/convite/${referralCode}`}
                readOnly 
                className="flex-1 text-sm bg-muted/50 border-2 border-accent/20"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={copyReferralLink}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </FormRow>

        <FormHint type="info">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="font-medium">Dica:</span> Use o formulário abaixo para enviar convites personalizados por email
          </div>
        </FormHint>

        {/* Formulário de indicação por email */}
        <div className="border-t pt-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Enviar Convite por Email
          </h4>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormRow>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Indicado</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Digite o nome da pessoa" 
                          className="border-2 focus:border-primary/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email do Indicado</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Digite o email da pessoa" 
                          className="border-2 focus:border-primary/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormRow>

              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-accent hover:scale-[1.02] transition-all duration-200"
                disabled={form.formState.isSubmitting}
              >
                <Mail className="h-4 w-4 mr-2" />
                {form.formState.isSubmitting ? "Enviando..." : "Enviar Convite"}
              </Button>
              
              <FormDescription className="text-center">
                Enviaremos um convite personalizado para esta pessoa
              </FormDescription>
            </form>
          </Form>
        </div>
      </FormSection>

      {/* Como funciona */}
      <FormSection 
        title="Como Funciona o Sistema de Indicação"
        icon={<Gift className="h-5 w-5 text-accent" />}
      >
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">1</div>
            <div>
              <h5 className="font-medium mb-1">Compartilhe seu código</h5>
              <p className="text-sm text-muted-foreground">Envie seu código ou link de indicação para amigos interessados</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">2</div>
            <div>
              <h5 className="font-medium mb-1">Eles se cadastram</h5>
              <p className="text-sm text-muted-foreground">Quando se cadastrarem usando seu código, vocês dois ganham créditos</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">3</div>
            <div>
              <h5 className="font-medium mb-1">Use os créditos</h5>
              <p className="text-sm text-muted-foreground">Utilize para gerar mais insights de IA para seus produtos e receitas</p>
            </div>
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default Settings;