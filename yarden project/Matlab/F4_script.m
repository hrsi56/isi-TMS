%%
clear;clc;close all;
load("Ys.mat"); %%%%%%%%%%    %F4  AvReref
load("Xs.mat")  %%%%%%%%%%    %F3  AvReref
load("Phase_deff.mat") %%%    LOAD FROM CZREF
load("subjects_unique.mat") 
load("freqs.mat"); 



freqs_RANGE_POWER= [8 15]; %%%%%%%%%%%%%%  freqs  RANGE POWER

%%  PROPAGATION TIME


conditions={'LR4' 'RL4' 'LR8' 'RL8' 'LR16' 'RL16' 'LR32' 'RL32' 'Sham'};
%PAS condition, before/after PAS, TEP right/left, Subject, Freqs, Times
Phasedef2= NaN(length(conditions),length(subjects_unique),157);
%computation
dddd=[];
dddd2=[];
for condition=1:length(conditions) %condition
    for subject=1:length(subjects_unique) %subjects
        try
        F3=Xs_CZ{condition,subject}{:,:};
        F4=Ys_CZ{condition,subject}{:,:};
        end
        Phasedef_ABS(condition,subject,:)= nanmean(squeeze(abs(angle(F4)-angle(F3))),2);
        Phasedef(condition,subject,:) = (nanmean(squeeze((angle(F4)-angle(F3))),2));
    end
end


freqs_RANGE=freqs>13&freqs<16; %%%%%%%%%%%%  freqs_RANGE FOR LAG 
Phasedef_ABS=squeeze(Phasedef_ABS(:,:,freqs_RANGE));
freqqq=freqs(freqs_RANGE);
for sub=1:length(Phasedef_ABS(1,:,1))
    for condition=1:length(Phasedef_ABS(:,1,1))
        for fr = 1:length(Phasedef_ABS(1,1,:))
            propagationTime_Sub_freq_c(condition,sub,fr)= (1000/freqqq(fr)).*(Phasedef_ABS(condition,sub,fr)/(2 *  pi));
        end
    propagationTime_Sub_c(condition,sub)= nanmean(propagationTime_Sub_freq_c(condition,sub,:),3);    
    end
    propagationTime_Sub_new(sub)= nanmean(propagationTime_Sub_c(:,sub),1);
end


propagationTime_Sub_freq_13_16=propagationTime_Sub_new;

%% POWER

freqs_RANGE=freqs>freqs_RANGE_POWER(1)&freqs<freqs_RANGE_POWER(2); %%%%%%%%%%%%


conditions={'LR4' 'RL4' 'LR8' 'RL8' 'LR16' 'RL16' 'LR32' 'RL32' 'Sham'};
Times={'Rest1' 'Rest2'};
%PAS condition, before/after PAS, TEP right/left, Subject, Freqs, Times
POWER_Y = NaN(length(conditions),length(Times),length(subjects_unique),157);
%computation
for condition=1:length(conditions) %condition
    for time=1:length(Times) %before or after pas
        for subject=1:length(subjects_unique) %subjects
            F3=NaN(157,1);F4=NaN(157,1);
            try
            F3=nanmean(squeeze(Xs{condition,time,subject}{:,:}),2);
            F4=nanmean(squeeze(Ys{condition,time,subject}{:,:}),2);
            end
            POWER_Y(condition,time,subject,:) = nanmean(squeeze(10*log10(abs(F4))), 2); 
        end
    end
end



POWER_Y_indused=squeeze(POWER_Y(:,2,:,:)-POWER_Y(:,1,:,:));
POWER_Y_indused_alpha=POWER_Y_indused(:,:,freqs_RANGE);
for sub=1:length(POWER_Y_indused_alpha(1,:,1))
    for condition=1:length(POWER_Y_indused_alpha(:,1,1))
        POWER_Y_indused_alpha_sub_condition(condition,sub)=squeeze(nanmean(POWER_Y_indused_alpha(condition,sub,:),3));
    end
end

conditions=categorical(conditions);
eff=(1:4);
eff_cat=categorical(["RL4-LR4" "RL8-LR8" "RL16-LR16" "RL32-LR32"]);
for i=1:length(POWER_Y_indused_alpha_sub_condition(1,:))
    POWER_Y_indused_alpha_sub_eff(1,i)=(POWER_Y_indused_alpha_sub_condition(conditions=={'RL4'},i)-POWER_Y_indused_alpha_sub_condition(conditions=={'LR4'},i));
    POWER_Y_indused_alpha_sub_eff(2,i)=(POWER_Y_indused_alpha_sub_condition(conditions=={'RL8'},i)-POWER_Y_indused_alpha_sub_condition(conditions=={'LR8'},i));
    POWER_Y_indused_alpha_sub_eff(3,i)=(POWER_Y_indused_alpha_sub_condition(conditions=={'RL16'},i)-POWER_Y_indused_alpha_sub_condition(conditions=={'LR16'},i));
    POWER_Y_indused_alpha_sub_eff(4,i)=(POWER_Y_indused_alpha_sub_condition(conditions=={'RL32'},i)-POWER_Y_indused_alpha_sub_condition(conditions=={'LR32'},i));
    for j=1:4
    POWER_Y_indused_alpha_sub_eff_abs(j,i)=abs(POWER_Y_indused_alpha_sub_eff(j,i));
    end
    POWER_Y_indused_alpha_sub_eff_max(i) = eff(max(POWER_Y_indused_alpha_sub_eff_abs(:,i))==POWER_Y_indused_alpha_sub_eff_abs(:,i));
    POWER_Y_indused_alpha_sub_eff_max_val(i)=POWER_Y_indused_alpha_sub_eff(POWER_Y_indused_alpha_sub_eff_max(i),i);

end

%% figures 
close all;
figure('WindowState','maximized');
subs=1:24;
condition_nums=1:9;
IPI=([4 , -4, 8, -8, 16, -16, 32,-32]);x=[];y=[];
subplot('Position',[0.1300 0.31 0.3628 0.15])
for i=1:24
    for j=1:4
        a=j*2-1;
        Lag=propagationTime_Sub_c(a,i);
        x= [x sign(IPI(a)).*(Lag-(IPI(a)))];
        y= [y POWER_Y_indused_alpha_sub_condition(a,i)];
    end
end


    scatter(x,y)
    title("LR");ylabel("Power [dB]");xlabel("Phase Difference - IPI")
    hold on
    subplot('Position',[0.1300 0.09 0.3628 0.15])
    x=[];y=[];
for i=1:24
    for j=1:4
        a=j*2;
        Lag=propagationTime_Sub_c(a,i);
        x= [x sign(IPI(a)).*(Lag-abs(IPI(a)))];
        y= [y POWER_Y_indused_alpha_sub_condition(a,i)];
    end
end

    scatter(x,y)
title("RL");ylabel("Power [dB]");xlabel("Phase Difference - IPI")


subplot('Position' , [0.1300 0.54 0.1566 0.3268])
bar(condition_nums,nanmean(POWER_Y_indused_alpha_sub_condition,2));
for i=1:length(conditions)
err(i)=nanstd(POWER_Y_indused_alpha_sub_condition(i,:))/sqrt(length(rmmissing(POWER_Y_indused_alpha_sub_condition(i,:))));
end
hold on
er=errorbar(condition_nums,nanmean(POWER_Y_indused_alpha_sub_condition,2),err);er.Color = [0 0 0];er.LineStyle = 'none';  
ylabel("Indused change in POWER on F4 [dB]");
xticks([1 2 3 4 5 6 7 8 9])
xticklabels(conditions)





subplot('Position' , [0.3361 0.54 0.1566 0.3268])
ylabel("Indused change in POWER on F4 [dB]");
bar(eff,nanmean(POWER_Y_indused_alpha_sub_eff,2))
xticks([1 2 3 4])
xticklabels(eff_cat)
hold on
scatter(POWER_Y_indused_alpha_sub_eff_max,POWER_Y_indused_alpha_sub_eff_max_val)
xticks([1 2 3 4])
xticklabels(eff_cat)
for xxa=1:4
err2(xxa)=nanstd(POWER_Y_indused_alpha_sub_eff(xxa,:))/sqrt(length(rmmissing(POWER_Y_indused_alpha_sub_eff(xxa,:))));
end
hold on
er=errorbar([1 2 3 4],nanmean(POWER_Y_indused_alpha_sub_eff,2),err2);er.Color = [0 0 0];er.LineStyle = 'none';  
title(["PAS induced changes" ;"maximum induced change difference"; "Bar: Average over Subjects" ])
ylabel(" induced Power change differences RL-LR [dB]")

subplot('Position' , [0.5422 0.54 0.3628 0.3268])
mdl=fitlm(POWER_Y_indused_alpha_sub_eff_max,propagationTime_Sub_freq_13_16);

hMDL=plot(mdl, 'Marker','o');
xticks([1 2 3 4])
xticklabels(eff_cat)
xlim([0.5 4.5])
ylabel("Individual Propagtion Time (ms)");
xlabel("Optimal IPI for Subject");
title(["subject's optimal IPI and the inter-hemispheric propagation time " ; "R  = " + num2str(mdl.Rsquared.Ordinary.^0.5) + " | P.value = " + num2str(mdl.Coefficients.pValue(2))]);
legend('off')

sgtitle(["Right stimulation area (F4 electrode); Power at Alpha band (" + num2str(freqs_RANGE_POWER(1)) + "-" + num2str(freqs_RANGE_POWER(2)) + " Hz) ; Phase differences at (13-16 Hz) " ;" "],fontsize=28);


%% NEW MODEL - AVERAGE PHASE DELAY 

Phasedef=squeeze(Phasedef(:,:,freqs>13&freqs<16));
for sub=1:length(Phasedef(1,:,1))
    for condition=1:length(Phasedef(:,1,1))
        Phasedef_sub_condition(condition,sub)=squeeze(nanmean(Phasedef(condition,sub,:),3));
    end
    Phasedef_sub(sub)=mean(Phasedef_sub_condition(:,sub),1);
end


subplot('Position' , [0.5422 0.115 0.3628 0.3268]) %%%% MAX
mdl=fitlm(Phasedef_sub,(POWER_Y_indused_alpha_sub_eff_max_val));
plot(mdl);
xlabel("Mean Individual Phase Difference (°)");
ylabel("Optimal IPI Influence's");
title(["individual average phase-delay to the PAS induced changes in power at the optimal IPI" ; "R  = " + num2str(mdl.Rsquared.Ordinary.^0.5) + " | P.value = " + num2str(mdl.Coefficients.pValue(2))]);
legend('off')



figure('WindowState','maximized')
for con=1:4
    subplot(2,2,con) %%%% ALL
    mdl=fitlm(Phasedef_sub(:),(POWER_Y_indused_alpha_sub_eff(con,:)));
    plot(mdl);
    xlabel("Individual Average Phase Difference (°)");
    ylabel("IPI Influence's on the induced changes in Power[dB]");
    title( ["individual average phase-delay to the PAS induced changes in power" ; "IPI = " + num2str(2*2^con) + "    ;  r= " + num2str(mdl.Rsquared.Ordinary.^0.5) + "; P= " + num2str(mdl.Coefficients.pValue(2))]);
    legend('off')
end
sgtitle(["Right stimulation area (F4 electrode); Power at Alpha band (" + num2str(freqs_RANGE_POWER(1)) + "-" + num2str(freqs_RANGE_POWER(2)) + " Hz) ; Phase differences at (13-16 Hz) " ;" "]);


%% 
figure()
histogram(POWER_Y_indused_alpha_sub_eff_max_val,12)
ylabel("Amount of individuals.")
xlabel("Subject's maximal effect in PAS induced change.")
