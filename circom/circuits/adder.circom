pragma circom 2.0.0;

template Adder() {
    signal input a;
    signal input b;
    signal input c;
    signal output quiz;

    quiz <-- c;
    quiz === a+b;
 }

 component main = Adder();
